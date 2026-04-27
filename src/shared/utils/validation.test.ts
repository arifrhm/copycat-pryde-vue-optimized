import { describe, it, expect } from 'vitest'
import { isValidEmail, isValidPhone, isValidUrl, isEmpty, hasMinLength, hasMaxLength } from './validation'

describe('Validation Utils', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@example.com')).toBe(true)
      expect(isValidEmail('user+tag@example.co.uk')).toBe(true)
      expect(isValidEmail('user123@test-domain.com')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('user@')).toBe(false)
      expect(isValidEmail('user@.com')).toBe(false)
      expect(isValidEmail('user@domain')).toBe(false)
      expect(isValidEmail('user name@example.com')).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })

    it('should handle edge cases', () => {
      expect(isValidEmail('a@b.co')).toBe(true)
      expect(isValidEmail('123@456.com')).toBe(true)
    })
  })

  describe('isValidPhone', () => {
    it('should validate 10-digit phone numbers', () => {
      expect(isValidPhone('1234567890')).toBe(true)
      expect(isValidPhone('9876543210')).toBe(true)
    })

    it('should validate phone numbers with formatting', () => {
      expect(isValidPhone('(123) 456-7890')).toBe(true)
      expect(isValidPhone('123-456-7890')).toBe(true)
      expect(isValidPhone('123.456.7890')).toBe(true)
      expect(isValidPhone('123 456 7890')).toBe(true)
    })

    it('should reject invalid phone numbers', () => {
      expect(isValidPhone('123')).toBe(false)
      expect(isValidPhone('1234567890123')).toBe(false)
      expect(isValidPhone('')).toBe(false)
      expect(isValidPhone('abcdefghij')).toBe(false)
    })

    it('should handle phone numbers with country code', () => {
      // The function strips all non-digits, so +1 gives us 11 digits
      // which is more than 10, so it should return false
      expect(isValidPhone('+1 123 456 7890')).toBe(false)
      expect(isValidPhone('1 123 456 7890')).toBe(false)
    })
  })

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true)
      expect(isValidUrl('http://example.com')).toBe(true)
      expect(isValidUrl('https://www.example.com')).toBe(true)
      expect(isValidUrl('https://example.com/path')).toBe(true)
      expect(isValidUrl('https://example.com?query=value')).toBe(true)
      expect(isValidUrl('https://example.com#hash')).toBe(true)
    })

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false)
      expect(isValidUrl('example.com')).toBe(false)
      expect(isValidUrl('')).toBe(false)
      expect(isValidUrl('https://')).toBe(false)
    })

    it('should handle URLs with special characters', () => {
      expect(isValidUrl('https://example.com/path?name=John Doe')).toBe(true)
      expect(isValidUrl('https://example.com/path#section-1')).toBe(true)
    })
  })

  describe('isEmpty', () => {
    it('should return true for empty strings', () => {
      expect(isEmpty('')).toBe(true)
      expect(isEmpty('   ')).toBe(true)
      expect(isEmpty('\t\n')).toBe(true)
    })

    it('should return false for non-empty strings', () => {
      expect(isEmpty('text')).toBe(false)
      expect(isEmpty('  text  ')).toBe(false)
      expect(isEmpty('a')).toBe(false)
    })
  })

  describe('hasMinLength', () => {
    it('should return true when string meets minimum length', () => {
      expect(hasMinLength('hello', 3)).toBe(true)
      expect(hasMinLength('hello', 5)).toBe(true)
      expect(hasMinLength('hello world', 5)).toBe(true)
    })

    it('should return false when string is below minimum length', () => {
      expect(hasMinLength('hi', 3)).toBe(false)
      expect(hasMinLength('hello', 10)).toBe(false)
      expect(hasMinLength('', 1)).toBe(false)
    })

    it('should handle zero minimum length', () => {
      expect(hasMinLength('', 0)).toBe(true)
      expect(hasMinLength('text', 0)).toBe(true)
    })
  })

  describe('hasMaxLength', () => {
    it('should return true when string is within maximum length', () => {
      expect(hasMaxLength('hi', 5)).toBe(true)
      expect(hasMaxLength('hello', 5)).toBe(true)
      expect(hasMaxLength('', 10)).toBe(true)
    })

    it('should return false when string exceeds maximum length', () => {
      expect(hasMaxLength('hello world', 5)).toBe(false)
      expect(hasMaxLength('hello', 3)).toBe(false)
      expect(hasMaxLength('text', 0)).toBe(false)
    })

    it('should handle large maximum lengths', () => {
      expect(hasMaxLength('test', 1000)).toBe(true)
    })

    it('should handle exact length match', () => {
      expect(hasMaxLength('hello', 5)).toBe(true)
    })
  })
})
