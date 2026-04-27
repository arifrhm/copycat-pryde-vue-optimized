<template>
  <section id="about" class="section bg-dark-50">
    <div class="container">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <p class="section-subtitle">About Us</p>
          <h2 class="section-heading">Your Business Deserves the Right Team.</h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Image -->
          <div class="relative">
            <div class="aspect-square bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
              <div class="text-center text-white p-8">
                <svg class="w-32 h-32 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <p class="text-2xl font-bold">Women-Owned Co</p>
                <p class="text-lg opacity-90">Denver Web Design</p>
              </div>
            </div>

            <!-- Decorative Elements -->
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/20 rounded-full -z-10"></div>
            <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-500/30 rounded-full -z-10"></div>
          </div>

          <!-- Content -->
          <div class="space-y-6">
            <p class="text-lg text-offwhite-600 leading-relaxed">
              Running a business takes vision, dedication, and a distinct presence in a crowded
              market. At <strong class="text-primary-500">PRYDE Designs</strong>, we create
              identities that connect, websites that convert, and strategies that support real
              scalability.
            </p>

            <p class="text-lg text-offwhite-600 leading-relaxed">
              Every design choice is intentional, blending creativity with function to give your
              business the best possible online foundation.
            </p>

            <p class="text-lg text-offwhite-600 leading-relaxed">
              When you work with us, you get a small curated team of
              <strong class="text-primary-500">expert designers, senior developers</strong>, and a
              dedicated creative project manager who keeps everything organized and moving forward.
            </p>

            <p class="text-lg text-offwhite-600 leading-relaxed">
              No templates, no shortcuts, just custom branding and websites tailored to your goals.
              Whether you're starting fresh or refining what you've already built, we're here to
              make sure your brand isn't just seen –
              <strong class="text-primary-500">it's remembered</strong>.
            </p>

            <a href="#contact" class="btn btn-primary" @click.prevent="scrollToSection('contact')">
              Work With Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { scrollToElement } from '@shared/utils'

function scrollToSection(sectionId: string) {
  scrollToElement(sectionId, 80)
}
</script>
