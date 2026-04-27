import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { PortfolioItem, PortfolioCategory } from '@core/domain/entities'
import { PortfolioUseCase } from '@application/usecases'
import { PortfolioRepository } from '@infrastructure/repositories'

/**
 * Portfolio Store
 * Manages portfolio state using Pinia (State Management)
 * Part of the Presentation Layer
 */
export const usePortfolioStore = defineStore('portfolio', () => {
  // State
  const portfolioItems = ref<PortfolioItem[]>([])
  const featuredItems = ref<PortfolioItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Dependencies
  const portfolioRepository = new PortfolioRepository()
  const portfolioUseCase = new PortfolioUseCase(portfolioRepository)

  // Computed
  const hasPortfolioItems = computed(() => portfolioItems.value.length > 0)
  const portfolioCount = computed(() => portfolioItems.value.length)
  const featuredCount = computed(() => featuredItems.value.length)

  // Actions
  async function fetchPortfolioItems() {
    loading.value = true
    error.value = null
    try {
      portfolioItems.value = await portfolioUseCase.getAllPortfolioItems()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch portfolio items'
      console.error('Error fetching portfolio items:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchFeaturedItems() {
    loading.value = true
    error.value = null
    try {
      featuredItems.value = await portfolioUseCase.getFeaturedPortfolioItems()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch featured items'
      console.error('Error fetching featured items:', err)
    } finally {
      loading.value = false
    }
  }

  async function getPortfolioItemById(id: string) {
    loading.value = true
    error.value = null
    try {
      return await portfolioUseCase.getPortfolioItemById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch portfolio item'
      console.error('Error fetching portfolio item:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  async function getItemsByCategory(category: PortfolioCategory) {
    loading.value = true
    error.value = null
    try {
      return await portfolioUseCase.getPortfolioItemsByCategory(category)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch items by category'
      console.error('Error fetching items by category:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  // Initialize
  async function initialize() {
    if (!hasPortfolioItems.value) {
      await Promise.all([fetchPortfolioItems(), fetchFeaturedItems()])
    }
  }

  return {
    // State
    portfolioItems,
    featuredItems,
    loading,
    error,
    // Computed
    hasPortfolioItems,
    portfolioCount,
    featuredCount,
    // Actions
    fetchPortfolioItems,
    fetchFeaturedItems,
    getPortfolioItemById,
    getItemsByCategory,
    clearError,
    initialize
  }
})
