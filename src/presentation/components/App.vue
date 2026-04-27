<template>
  <div id="app" class="min-h-screen flex flex-col">
    <AppHeader />

    <main class="flex-grow">
      <HeroSection />

      <!-- Lazy load below-the-fold sections -->
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <TestimonialsSection />

      <ContactSection />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue'
import { AppHeader, AppFooter } from './layout'

// Eager load only the critical above-the-fold component
import HeroSection from './sections/HeroSection.vue'

// Lazy load all other sections including contact
const ServicesSection = defineAsyncComponent({
  loader: () => import('./sections/ServicesSection.vue'),
  delay: 50
})
const AboutSection = defineAsyncComponent({
  loader: () => import('./sections/AboutSection.vue'),
  delay: 50
})
const PortfolioSection = defineAsyncComponent({
  loader: () => import('./sections/PortfolioSection.vue'),
  delay: 50
})
const TestimonialsSection = defineAsyncComponent({
  loader: () => import('./sections/TestimonialsSection.vue'),
  delay: 50
})
const ContactSection = defineAsyncComponent({
  loader: () => import('./sections/ContactSection.vue'),
  delay: 50
})

import { useServiceStore, usePortfolioStore, useTestimonialStore } from '@presentation/stores'

// Initialize stores
const serviceStore = useServiceStore()
const portfolioStore = usePortfolioStore()
const testimonialStore = useTestimonialStore()

onMounted(async () => {
  // Defer data loading to prevent blocking initial render
  // Use requestIdleCallback if available, otherwise setTimeout
  const initData = async () => {
    // Load stores in parallel but don't block render
    serviceStore.initialize()
    portfolioStore.initialize()
    testimonialStore.initialize()
  }

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => initData(), { timeout: 2000 })
  } else {
    setTimeout(() => initData(), 100)
  }
})
</script>
