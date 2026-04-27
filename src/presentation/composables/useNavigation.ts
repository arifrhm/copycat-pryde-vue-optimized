import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

/**
 * Navigation Composable
 * Provides navigation-related functionality
 * Part of the Presentation Layer
 */
export function useNavigation() {
  const router = useRouter()
  const isMenuOpen = ref(false)
  const activeRoute = computed(() => router.currentRoute.value.name)

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
  }

  function closeMenu() {
    isMenuOpen.value = false
  }

  function navigateTo(route: string) {
    router.push(route)
    closeMenu()
  }

  function scrollToElement(elementId: string) {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      closeMenu()
    }
  }

  return {
    isMenuOpen,
    activeRoute,
    toggleMenu,
    closeMenu,
    navigateTo,
    scrollToElement
  }
}
