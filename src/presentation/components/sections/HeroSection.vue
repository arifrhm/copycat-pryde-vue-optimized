<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center bg-dark-900">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0 bg-pattern"></div>
    </div>

    <div class="container relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-offwhite-200 mb-6 animation-slide-up">
          Custom Websites & Branding
        </h1>

        <p class="text-xl md:text-2xl text-primary-500 mb-4 animation-slide-up animation-delay-100">
          Web Design | Logo | Graphic Design
        </p>

        <p class="text-lg text-offwhite-400 mb-8 max-w-2xl mx-auto animation-slide-up animation-delay-200">
          Based in Denver, CO | Serving businesses nationwide
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animation-slide-up animation-delay-300">
          <a href="#contact" class="btn btn-primary text-lg px-8 py-4" @click.prevent="scrollToSection('contact')">
            Let's Get Started
          </a>
          <a href="#portfolio" class="btn btn-outline text-lg px-8 py-4" @click.prevent="scrollToSection('portfolio')">
            View Our Work
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <a href="#services" @click.prevent="scrollToSection('services')" class="text-primary-500 hover:text-primary-500 transition-colors">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { scrollToElement } from '@shared/utils'

function scrollToSection(sectionId: string) {
  scrollToElement(sectionId, 80)
}
</script>

<style scoped>
.animation-delay-100 {
  animation-delay: 0.1s;
}
.animation-delay-200 {
  animation-delay: 0.2s;
}
.animation-delay-300 {
  animation-delay: 0.3s;
}
</style>
