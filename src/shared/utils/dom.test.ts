import { describe, it, expect, vi, beforeEach } from 'vitest'
import { scrollToElement, scrollToTop, isInViewport, addClass, removeClass, toggleClass, debounce, throttle } from './dom'

describe('DOM Utils', () => {
  describe('scrollToElement', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    it('should scroll to element when found', () => {
      const mockElement = {
        getBoundingClientRect: vi.fn().mockReturnValue({ top: 100, left: 0, bottom: 200, right: 100 })
      }
      vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any)
      vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0)
      const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

      scrollToElement('test-id', 80)
      vi.runAllTimers()

      expect(document.getElementById).toHaveBeenCalledWith('test-id')
      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 20, // 100 - 80
        behavior: 'smooth'
      })
    })

    it('should handle element not found', () => {
      vi.clearAllTimers()
      vi.spyOn(document, 'getElementById').mockReturnValue(null)
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      scrollToElement('non-existent')
      vi.runAllTimers()

      expect(consoleSpy).toHaveBeenCalledWith('Element with id "non-existent" not found')
      consoleSpy.mockRestore()
    })

    it('should use default offset of 0', () => {
      const mockElement = {
        getBoundingClientRect: vi.fn().mockReturnValue({ top: 100, left: 0, bottom: 200, right: 100 })
      }
      vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any)
      vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0)
      const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

      scrollToElement('test-id')
      vi.runAllTimers()

      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 100,
        behavior: 'smooth'
      })
    })
  })

  describe('scrollToTop', () => {
    it('should scroll to top of page', () => {
      const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

      scrollToTop()

      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      })
    })
  })

  describe('isInViewport', () => {
    it('should return true when element is fully in viewport', () => {
      const mockElement = {
        getBoundingClientRect: vi.fn().mockReturnValue({
          top: 100,
          left: 0,
          bottom: 300,
          right: 100
        })
      }
      vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(500)
      vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(500)

      const result = isInViewport(mockElement as any)

      expect(result).toBe(true)
    })

    it('should return false when element is outside viewport', () => {
      const mockElement = {
        getBoundingClientRect: vi.fn().mockReturnValue({
          top: -100,
          left: 0,
          bottom: 0,
          right: 100
        })
      }
      vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(500)
      vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(500)

      const result = isInViewport(mockElement as any)

      expect(result).toBe(false)
    })
  })

  describe('Class manipulation functions', () => {
    let mockElement: any

    beforeEach(() => {
      mockElement = {
        classList: {
          add: vi.fn(),
          remove: vi.fn(),
          toggle: vi.fn()
        }
      }
    })

    it('should add class to element', () => {
      addClass(mockElement, 'test-class')

      expect(mockElement.classList.add).toHaveBeenCalledWith('test-class')
    })

    it('should remove class from element', () => {
      removeClass(mockElement, 'test-class')

      expect(mockElement.classList.remove).toHaveBeenCalledWith('test-class')
    })

    it('should toggle class on element', () => {
      toggleClass(mockElement, 'test-class')

      expect(mockElement.classList.toggle).toHaveBeenCalledWith('test-class')
    })
  })

  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should delay function execution', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 300)

      debouncedFn()

      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(300)

      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should reset timer on multiple calls', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 300)

      debouncedFn()
      vi.advanceTimersByTime(200)
      debouncedFn()
      vi.advanceTimersByTime(200)

      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)

      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should pass arguments to debounced function', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn('arg1', 'arg2')

      vi.advanceTimersByTime(100)

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
    })
  })

  describe('throttle', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should limit function execution rate', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 300)

      throttledFn()
      throttledFn()
      throttledFn()

      expect(mockFn).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(300)

      throttledFn()

      expect(mockFn).toHaveBeenCalledTimes(2)
    })

    it('should pass arguments to throttled function', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn('test')

      expect(mockFn).toHaveBeenCalledWith('test')
    })
  })
})
