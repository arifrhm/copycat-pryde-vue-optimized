/**
 * Application Constants
 * Centralized constants for the application
 * Part of the Shared Layer
 */

/**
 * Application metadata
 */
export const APP_METADATA = {
  title: 'PRYDE Designs',
  description: 'Custom Websites & Branding - Web Design | Logo | Graphic Design',
  keywords: 'web design, logo design, branding, graphic design, website development',
  author: 'PRYDE Designs',
  url: 'https://prydedesigns.com'
} as const

/**
 * Company information
 */
export const COMPANY_INFO = {
  name: 'PRYDE Designs',
  tagline: 'Custom Websites & Branding',
  location: 'Denver, CO',
  email: 'hello@prydedesigns.com',
  phone: '(555) 123-4567',
  foundedYear: 2020
} as const

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/prydedesigns',
  instagram: 'https://instagram.com/prydedesigns',
  linkedin: 'https://linkedin.com/company/prydedesigns',
  twitter: 'https://twitter.com/prydedesigns'
} as const

/**
 * Navigation menu items
 */
export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' }
] as const

/**
 * CTA buttons
 */
export const CTA_BUTTONS = {
  primary: {
    text: 'Let\'s Get Started',
    href: '#contact'
  },
  secondary: {
    text: 'View Our Work',
    href: '#portfolio'
  }
} as const

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500
} as const

/**
 * Breakpoints (for reference, Tailwind defaults are used)
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const
