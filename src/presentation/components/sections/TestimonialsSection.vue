<template>
  <section id="testimonials" class="section bg-dark-800">
    <div class="container">
      <div class="section-title">
        <p class="section-subtitle">Testimonials</p>
        <h2 class="section-heading">Quality Work. Real Connections.</h2>
        <p class="section-description">
          Don't just take our word for it. Here's what our clients have to say about working
          with us.
        </p>
      </div>

      <!-- Featured Testimonial -->
      <div v-if="featuredTestimonial" class="mb-12">
        <div class="card bg-gradient-to-br from-primary-500 to-primary-700 text-white max-w-4xl mx-auto">
          <div class="flex flex-col md:flex-row gap-6 items-center">
            <!-- Avatar -->
            <div class="flex-shrink-0">
              <div
                class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold"
              >
                {{ featuredTestimonial.getAuthorInitials() }}
              </div>
            </div>

            <!-- Content -->
            <div class="flex-grow">
              <div class="flex items-center mb-4">
                <template v-for="_ in 5" :key="_">
                  <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </template>
              </div>

              <blockquote class="text-lg md:text-xl mb-6 leading-relaxed">
                "{{ truncateText(featuredTestimonial.content, 300) }}"
              </blockquote>

              <cite class="not-italic">
                <p class="font-bold text-lg">{{ featuredTestimonial.author }}</p>
                <p class="text-primary-200">{{ featuredTestimonial.company }}</p>
              </cite>
            </div>
          </div>
        </div>
      </div>

      <!-- Testimonials Grid -->
      <div v-if="loading" class="flex justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>

      <div v-else-if="error" class="text-center text-red-600">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="testimonial in displayedTestimonials"
          :key="testimonial.id"
          class="card"
        >
          <div class="flex items-center mb-4">
            <template v-for="_ in 5" :key="_">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </template>
          </div>

          <blockquote class="text-neutral-600 mb-6 leading-relaxed">
            "{{ truncateText(testimonial.content, 200) }}"
          </blockquote>

          <cite class="not-italic flex items-center gap-3">
            <div
              class="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold"
            >
              {{ testimonial.getAuthorInitials() }}
            </div>
            <div>
              <p class="font-bold text-neutral-900">{{ testimonial.author }}</p>
              <p class="text-sm text-neutral-500">{{ testimonial.company }}</p>
            </div>
          </cite>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTestimonialStore } from '@presentation/stores'
import { truncateText } from '@shared/utils'

const testimonialStore = useTestimonialStore()
const loading = ref(testimonialStore.loading)
const error = ref(testimonialStore.error)

const featuredTestimonial = computed(() => testimonialStore.topRatedTestimonials[0])

const displayedTestimonials = computed(() => {
  return testimonialStore.topRatedTestimonials.slice(1, 7)
})

onMounted(async () => {
  await testimonialStore.initialize()
  loading.value = testimonialStore.loading
  error.value = testimonialStore.error
})
</script>
