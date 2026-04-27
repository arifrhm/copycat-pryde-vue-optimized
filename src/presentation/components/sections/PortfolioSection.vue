<template>
  <section id="portfolio" class="section bg-dark-900">
    <div class="container">
      <div class="section-title">
        <p class="section-subtitle">Portfolio</p>
        <h2 class="section-heading">We Design. You Shine.</h2>
        <p class="section-description">
          From logos to full brand identities, we've worked with businesses that value design as
          a key part of growth.
        </p>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button
          v-for="category in categories"
          :key="category.value"
          @click="selectedCategory = category.value as PortfolioCategory | 'all'"
          class="px-6 py-2 rounded-full font-medium transition-all duration-300"
          :class="
            selectedCategory === category.value
              ? 'bg-primary-500 text-white'
              : 'bg-dark-700 text-offwhite-700 hover:bg-dark-600'
          "
        >
          {{ category.label }}
        </button>
      </div>

      <!-- Portfolio Grid -->
      <div v-if="loading" class="flex justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>

      <div v-else-if="error" class="text-center text-red-600">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <article
          v-for="item in filteredPortfolio"
          :key="item.id"
          class="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
          @click="scrollToSection('contact')"
        >
          <!-- Image -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
            <div class="text-white text-center p-4">
              <svg class="w-16 h-16 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              <p class="text-sm font-medium opacity-90">{{ item.title }}</p>
            </div>
          </div>

          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div class="absolute bottom-0 left-0 right-0 p-6 text-offwhite-200">
              <p class="text-sm text-primary-400 mb-1">
                {{ getCategoryName(item.category) }}
              </p>
              <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
              <p v-if="item.description" class="text-sm text-offwhite-300">{{ item.description }}</p>
            </div>
          </div>
        </article>
      </div>

      <!-- View More -->
      <div class="text-center mt-12">
        <a href="#contact" class="btn btn-primary" @click.prevent="scrollToSection('contact')">
          Start Your Project
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePortfolioStore } from '@presentation/stores'
import { PortfolioCategory, PORTFOLIO_CATEGORY_NAMES } from '@core/domain/entities'
import { scrollToElement } from '@shared/utils'

const portfolioStore = usePortfolioStore()
const loading = ref(portfolioStore.loading)
const error = ref(portfolioStore.error)
const selectedCategory = ref<PortfolioCategory | 'all'>('all')

const categories = [
  { label: 'All', value: 'all' },
  { label: PORTFOLIO_CATEGORY_NAMES[PortfolioCategory.WEB_DESIGN], value: PortfolioCategory.WEB_DESIGN },
  { label: PORTFOLIO_CATEGORY_NAMES[PortfolioCategory.LOGO_BRANDING], value: PortfolioCategory.LOGO_BRANDING },
  { label: PORTFOLIO_CATEGORY_NAMES[PortfolioCategory.GRAPHIC_DESIGN], value: PortfolioCategory.GRAPHIC_DESIGN },
  { label: PORTFOLIO_CATEGORY_NAMES[PortfolioCategory.WEB_DEVELOPMENT], value: PortfolioCategory.WEB_DEVELOPMENT },
  { label: PORTFOLIO_CATEGORY_NAMES[PortfolioCategory.UX_UI], value: PortfolioCategory.UX_UI },
  { label: PORTFOLIO_CATEGORY_NAMES[PortfolioCategory.SEO], value: PortfolioCategory.SEO }
]

const filteredPortfolio = computed(() => {
  const items = portfolioStore.portfolioItems
  if (selectedCategory.value === 'all') return items
  return items.filter((item) => item.category === selectedCategory.value)
})

function getCategoryName(category: PortfolioCategory): string {
  return PORTFOLIO_CATEGORY_NAMES[category]
}

function scrollToSection(sectionId: string) {
  scrollToElement(sectionId, 80)
}

onMounted(async () => {
  await portfolioStore.initialize()
  loading.value = portfolioStore.loading
  error.value = portfolioStore.error
})
</script>
