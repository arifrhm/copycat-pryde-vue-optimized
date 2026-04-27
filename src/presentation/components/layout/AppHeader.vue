<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-dark-900/95 backdrop-blur-sm shadow-md border-b border-dark-700' : 'bg-dark-900/80'"
  >
    <nav class="container">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <a href="#home" class="flex items-center space-x-2" @click.prevent="scrollToSection('home')">
          <img
            src="/logo.svg"
            alt="PRYDE Designs Logo"
            class="h-10 w-auto"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
          />
          <span
            class="hidden text-2xl font-heading font-bold text-primary-500"
            style="display: none"
          >
            PRYDE
          </span>
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in navigationItems"
            :key="item.href"
            :href="item.href"
            class="text-offwhite-700 hover:text-primary-500 transition-colors duration-200 font-medium"
            @click.prevent="scrollToSection(item.href.slice(1))"
          >
            {{ item.label }}
          </a>
          <button
            @click="scrollToSection('contact')"
            class="btn btn-primary"
            aria-label="Get Started"
          >
            Get Started
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 rounded-lg hover:bg-dark-700 transition-colors"
          @click="toggleMenu"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        >
          <svg
            v-if="!isMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <Transition name="slide-down">
        <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-dark-600">
          <div class="flex flex-col space-y-4">
            <a
              v-for="item in navigationItems"
              :key="item.href"
              :href="item.href"
              class="text-offwhite-700 hover:text-primary-500 transition-colors duration-200 font-medium py-2"
              @click="scrollToSection(item.href.slice(1))"
            >
              {{ item.label }}
            </a>
            <button
              @click="scrollToSection('contact')"
              class="btn btn-primary w-full"
              aria-label="Get Started"
            >
              Get Started
            </button>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { NAVIGATION_ITEMS } from '@shared/constants'
import { scrollToElement } from '@shared/utils'

const navigationItems = NAVIGATION_ITEMS
const isMenuOpen = ref(false)
const isScrolled = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function scrollToSection(sectionId: string) {
  scrollToElement(sectionId, 80)
  isMenuOpen.value = false
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
