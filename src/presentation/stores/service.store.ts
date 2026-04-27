import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Service } from '@core/domain/entities'
import { ServiceUseCase } from '@application/usecases'
import { ServiceRepository } from '@infrastructure/repositories'

/**
 * Service Store
 * Manages service state using Pinia (State Management)
 * Part of the Presentation Layer
 */
export const useServiceStore = defineStore('service', () => {
  // State
  const services = ref<Service[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Dependencies
  const serviceRepository = new ServiceRepository()
  const serviceUseCase = new ServiceUseCase(serviceRepository)

  // Computed
  const hasServices = computed(() => services.value.length > 0)
  const serviceCount = computed(() => services.value.length)

  // Actions
  async function fetchServices() {
    loading.value = true
    error.value = null
    try {
      services.value = await serviceUseCase.getAllServices()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch services'
      console.error('Error fetching services:', err)
    } finally {
      loading.value = false
    }
  }

  async function getServiceById(id: string) {
    loading.value = true
    error.value = null
    try {
      return await serviceUseCase.getServiceById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch service'
      console.error('Error fetching service:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  // Initialize
  async function initialize() {
    if (!hasServices.value) {
      await fetchServices()
    }
  }

  return {
    // State
    services,
    loading,
    error,
    // Computed
    hasServices,
    serviceCount,
    // Actions
    fetchServices,
    getServiceById,
    clearError,
    initialize
  }
})
