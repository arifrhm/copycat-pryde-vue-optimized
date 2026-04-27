import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Testimonial } from '@core/domain/entities'
import { TestimonialUseCase } from '@application/usecases'
import { TestimonialRepository } from '@infrastructure/repositories'

/**
 * Testimonial Store
 * Manages testimonial state using Pinia (State Management)
 * Part of the Presentation Layer
 */
export const useTestimonialStore = defineStore('testimonial', () => {
  // State
  const testimonials = ref<Testimonial[]>([])
  const featuredTestimonials = ref<Testimonial[]>([])
  const topRatedTestimonials = ref<Testimonial[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Dependencies
  const testimonialRepository = new TestimonialRepository()
  const testimonialUseCase = new TestimonialUseCase(testimonialRepository)

  // Computed
  const hasTestimonials = computed(() => testimonials.value.length > 0)
  const testimonialCount = computed(() => testimonials.value.length)
  const featuredCount = computed(() => featuredTestimonials.value.length)

  // Actions
  async function fetchTestimonials() {
    loading.value = true
    error.value = null
    try {
      testimonials.value = await testimonialUseCase.getAllTestimonials()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch testimonials'
      console.error('Error fetching testimonials:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchFeaturedTestimonials() {
    loading.value = true
    error.value = null
    try {
      featuredTestimonials.value = await testimonialUseCase.getFeaturedTestimonials()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch featured testimonials'
      console.error('Error fetching featured testimonials:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchTopRatedTestimonials(limit = 6) {
    loading.value = true
    error.value = null
    try {
      topRatedTestimonials.value = await testimonialUseCase.getTopRatedTestimonials(limit)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch top rated testimonials'
      console.error('Error fetching top rated testimonials:', err)
    } finally {
      loading.value = false
    }
  }

  async function getTestimonialById(id: string) {
    loading.value = true
    error.value = null
    try {
      return await testimonialUseCase.getTestimonialById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch testimonial'
      console.error('Error fetching testimonial:', err)
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
    if (!hasTestimonials.value) {
      await Promise.all([
        fetchTestimonials(),
        fetchFeaturedTestimonials(),
        fetchTopRatedTestimonials()
      ])
    }
  }

  return {
    // State
    testimonials,
    featuredTestimonials,
    topRatedTestimonials,
    loading,
    error,
    // Computed
    hasTestimonials,
    testimonialCount,
    featuredCount,
    // Actions
    fetchTestimonials,
    fetchFeaturedTestimonials,
    fetchTopRatedTestimonials,
    getTestimonialById,
    clearError,
    initialize
  }
})
