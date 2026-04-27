/**
 * Validation Utilities
 * Common validation functions
 * Part of the Shared Layer
 */

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email)
}

/**
 * Validate phone number format (US)
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 10
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Check if string is empty or only whitespace
 */
export function isEmpty(str: string): boolean {
  return str.trim().length === 0
}

/**
 * Validate minimum string length
 */
export function hasMinLength(str: string, min: number): boolean {
  return str.length >= min
}

/**
 * Validate maximum string length
 */
export function hasMaxLength(str: string, max: number): boolean {
  return str.length <= max
}
