<template>
  <section id="services" class="section bg-dark-800">
    <div class="container">
      <div class="section-title">
        <p class="section-subtitle">Our Services</p>
        <h2 class="section-heading">Strong Brands Start With Smart Design.</h2>
        <p class="section-description">
          We design branding and websites that feel polished, clear, and easy to use, so your
          business is well-represented online.
        </p>
      </div>

      <div v-if="loading" class="flex justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>

      <div v-else-if="error" class="text-center text-red-600">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <article
          v-for="service in services"
          :key="service.id"
          class="card group hover:-translate-y-2"
        >
          <div class="w-16 h-16 bg-primary-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-500/20 transition-colors">
            <component :is="getServiceIcon(service.icon)" class="w-8 h-8 text-primary-500" />
          </div>

          <h3 class="text-xl font-bold mb-4 text-offwhite-900">{{ service.title }}</h3>

          <p class="text-offwhite-600 leading-relaxed">{{ service.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, defineComponent, h } from 'vue'
import { useServiceStore } from '@presentation/stores'

const serviceStore = useServiceStore()
const services = ref(serviceStore.services)
const loading = ref(serviceStore.loading)
const error = ref(serviceStore.error)

onMounted(async () => {
  await serviceStore.initialize()
  services.value = serviceStore.services
  loading.value = serviceStore.loading
  error.value = serviceStore.error
})

// Icon components as render functions
const GlobeIcon = defineComponent({
  render: () =>
    h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
      })
    ])
})

const PaletteIcon = defineComponent({
  render: () =>
    h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
      })
    ])
})

const WrenchIcon = defineComponent({
  render: () =>
    h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
      }),
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
      })
    ])
})

const PenToolIcon = defineComponent({
  render: () =>
    h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
      })
    ])
})

function getServiceIcon(iconName: string) {
  const icons: Record<string, ReturnType<typeof defineComponent>> = {
    globe: GlobeIcon,
    palette: PaletteIcon,
    wrench: WrenchIcon,
    'pen-tool': PenToolIcon
  }
  return icons[iconName] || GlobeIcon
}
</script>
