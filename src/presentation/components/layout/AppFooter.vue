<template>
  <footer class="bg-dark-950 text-offwhite-200">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
        <!-- Company Info -->
        <div>
          <h3 class="text-xl font-bold mb-4">{{ companyInfo.name }}</h3>
          <p class="text-offwhite-400 mb-4">{{ companyInfo.tagline }}</p>
          <p class="text-offwhite-400">
            {{ companyInfo.location }}
            <br />
            {{ companyInfo.email }}
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="item in navigationItems" :key="item.href">
              <a
                :href="item.href"
                class="text-offwhite-400 hover:text-primary-500 transition-colors"
                @click.prevent="scrollToSection(item.href.slice(1))"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Services</h4>
          <ul class="space-y-2">
            <li>
              <a href="#services" class="text-offwhite-400 hover:text-primary-500 transition-colors">
                Website Design & Development
              </a>
            </li>
            <li>
              <a href="#services" class="text-offwhite-400 hover:text-primary-500 transition-colors">
                Logo & Brand Identity
              </a>
            </li>
            <li>
              <a href="#services" class="text-offwhite-400 hover:text-primary-500 transition-colors">
                Website Maintenance
              </a>
            </li>
            <li>
              <a href="#services" class="text-offwhite-400 hover:text-primary-500 transition-colors">
                Graphic Design
              </a>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Follow Us</h4>
          <div class="flex space-x-4">
            <a
              v-for="(link, platform) in socialLinks"
              :key="platform"
              :href="link"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 flex items-center justify-center bg-dark-800 rounded-full hover:bg-primary-500 transition-colors"
              :aria-label="`Follow us on ${platform}`"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-dark-700 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-offwhite-400 text-sm">
            &copy; {{ currentYear }} {{ companyInfo.name }}. All rights reserved.
          </p>
          <p class="text-offwhite-400 text-sm mt-2 md:mt-0">
            Designed with passion in Denver, CO
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { COMPANY_INFO, NAVIGATION_ITEMS, SOCIAL_LINKS } from '@shared/constants'
import { scrollToElement } from '@shared/utils'

const companyInfo = COMPANY_INFO
const navigationItems = NAVIGATION_ITEMS
const socialLinks = SOCIAL_LINKS

const currentYear = computed(() => new Date().getFullYear())

function scrollToSection(sectionId: string) {
  scrollToElement(sectionId, 80)
}
</script>
