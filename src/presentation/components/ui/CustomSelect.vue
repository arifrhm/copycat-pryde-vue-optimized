<template>
  <div class="relative" ref="selectContainer">
    <button
      type="button"
      @click="toggleDropdown"
      class="w-full px-4 py-3 pr-10 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-dark-700 text-left flex items-center justify-between"
      :class="{ 'ring-2 ring-primary-500 border-transparent': isOpen }"
    >
      <span class="truncate" :class="selectedOption ? 'text-offwhite-900' : 'text-offwhite-500'">
        {{ selectedOption || placeholder }}
      </span>
      <svg
        class="w-5 h-5 text-offwhite-500 transition-transform duration-200 flex-shrink-0 ml-2"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute z-50 w-full mt-2 bg-dark-700 border border-dark-200 rounded-lg shadow-xl shadow-dark-950/50 max-h-60 overflow-auto"
      >
        <div
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="px-4 py-3 cursor-pointer transition-colors duration-150 hover:bg-primary-500/1050 flex items-center"
          :class="{
            'bg-primary-500/20 text-primary-500': modelValue === option.value,
            'text-offwhite-900': modelValue !== option.value
          }"
        >
          <svg
            v-if="modelValue === option.value"
            class="w-5 h-5 mr-2 text-primary-500 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="flex-grow">{{ option.label }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Option {
  value: string
  label: string
}

interface Props {
  options: Option[]
  placeholder?: string
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option'
})

const emit = defineEmits<Emits>()

const isOpen = ref(false)
const selectContainer = ref<HTMLElement | null>(null)

const selectedOption = computed(() => {
  const option = props.options.find((opt) => opt.value === props.modelValue)
  return option?.label || ''
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectOption(option: Option) {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

function closeDropdown(event: MouseEvent) {
  if (selectContainer.value && !selectContainer.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
  transform-origin: top;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.95) translateY(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: scaleY(1) translateY(0);
}

/* Custom scrollbar for dropdown */
:deep(.absolute) {
  scrollbar-width: thin;
  scrollbar-color: #445266 #222b34;
}

:deep(.absolute::-webkit-scrollbar) {
  width: 8px;
}

:deep(.absolute::-webkit-scrollbar-track) {
  background: #222b34;
  border-radius: 4px;
}

:deep(.absolute::-webkit-scrollbar-thumb) {
  background: #445266;
  border-radius: 4px;
}

:deep(.absolute::-webkit-scrollbar-thumb:hover) {
  background: #03d8c8;
}
</style>
