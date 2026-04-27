<template>
  <section id="contact" class="section bg-dark-900">
    <div class="container">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <p class="section-subtitle">Contact Us</p>
          <h2 class="section-heading">Let's Create Something Amazing Together</h2>
          <p class="section-description">
            Ready to elevate your brand? Get in touch with us and let's discuss your project.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Info -->
          <div class="space-y-8">
            <div>
              <h3 class="text-2xl font-bold mb-6">Get In Touch</h3>
              <p class="text-offwhite-600 mb-8">
                We'd love to hear from you. Fill out the form and we'll get back to you as soon as
                possible.
              </p>
            </div>

            <div class="space-y-6">
              <!-- Email -->
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 bg-dark-700 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Email Us</h4>
                  <a
                    :href="`mailto:${companyInfo.email}`"
                    class="text-primary-500 hover:text-primary-500 transition-colors"
                  >
                    {{ companyInfo.email }}
                  </a>
                </div>
              </div>

              <!-- Location -->
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 bg-dark-700 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Location</h4>
                  <p class="text-offwhite-600">{{ companyInfo.location }}</p>
                </div>
              </div>

              <!-- Business Hours -->
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 bg-dark-700 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Business Hours</h4>
                  <p class="text-offwhite-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="card">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-offwhite-700 mb-2">
                  Your Name *
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-dark-700 text-offwhite-200 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-offwhite-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-dark-700 text-offwhite-200 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label for="company" class="block text-sm font-medium text-offwhite-700 mb-2">
                  Company Name
                </label>
                <input
                  id="company"
                  v-model="formData.company"
                  type="text"
                  class="w-full px-4 py-3 bg-dark-700 text-offwhite-200 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label for="service" class="block text-sm font-medium text-offwhite-700 mb-2">
                  Service Interested In
                </label>
                <CustomSelect
                  v-model="formData.service"
                  :options="serviceOptions"
                  placeholder="Select a service"
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-offwhite-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  rows="4"
                  required
                  class="w-full px-4 py-3 bg-dark-700 text-offwhite-200 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="btn btn-primary w-full text-lg"
                :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
              >
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>

              <p v-if="submitStatus" class="text-center" :class="submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'">
                {{ submitStatus.message }}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { COMPANY_INFO } from '@shared/constants'
import { isValidEmail } from '@shared/utils'
import { CustomSelect } from '../ui'

const companyInfo = COMPANY_INFO
const isSubmitting = ref(false)
const submitStatus = ref<{ type: 'success' | 'error'; message: string } | null>(null)

const serviceOptions = [
  { value: 'web-design', label: 'Website Design & Development' },
  { value: 'logo-branding', label: 'Logo & Brand Identity' },
  { value: 'maintenance', label: 'Website Maintenance' },
  { value: 'graphic-design', label: 'Graphic Design' }
]

const formData = reactive({
  name: '',
  email: '',
  company: '',
  service: '',
  message: ''
})

async function handleSubmit() {
  // Validate email
  if (!isValidEmail(formData.email)) {
    submitStatus.value = { type: 'error', message: 'Please enter a valid email address' }
    return
  }

  isSubmitting.value = true
  submitStatus.value = null

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In production, this would send the form data to your backend
    console.log('Form submitted:', formData)

    submitStatus.value = {
      type: 'success',
      message: 'Thank you for your message! We\'ll get back to you soon.'
    }

    // Reset form
    Object.assign(formData, {
      name: '',
      email: '',
      company: '',
      service: '',
      message: ''
    })
  } catch (error) {
    submitStatus.value = {
      type: 'error',
      message: 'An error occurred. Please try again later.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
