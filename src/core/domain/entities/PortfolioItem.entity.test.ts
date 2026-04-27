import { describe, it, expect } from 'vitest'
import { PortfolioItem, PortfolioCategory, PORTFOLIO_CATEGORY_NAMES } from './PortfolioItem.entity'

describe('PortfolioItem Entity', () => {
  describe('Factory Method', () => {
    it('should create a PortfolioItem instance with all required fields', () => {
      const data = {
        id: '1',
        title: 'Test Project',
        category: PortfolioCategory.WEB_DESIGN,
        image: '/test.jpg'
      }

      const portfolioItem = PortfolioItem.create(data)

      expect(portfolioItem).toBeInstanceOf(PortfolioItem)
      expect(portfolioItem.id).toBe('1')
      expect(portfolioItem.title).toBe('Test Project')
      expect(portfolioItem.category).toBe(PortfolioCategory.WEB_DESIGN)
      expect(portfolioItem.image).toBe('/test.jpg')
    })

    it('should create a PortfolioItem with optional fields', () => {
      const data = {
        id: '2',
        title: 'Featured Project',
        category: PortfolioCategory.LOGO_BRANDING,
        image: '/featured.jpg',
        description: 'A featured project',
        featured: true,
        order: 1
      }

      const portfolioItem = PortfolioItem.create(data)

      expect(portfolioItem.description).toBe('A featured project')
      expect(portfolioItem.featured).toBe(true)
      expect(portfolioItem.order).toBe(1)
    })
  })

  describe('isOfCategory Method', () => {
    it('should return true when category matches', () => {
      const portfolioItem = PortfolioItem.create({
        id: '1',
        title: 'Test',
        category: PortfolioCategory.WEB_DESIGN,
        image: '/test.jpg'
      })

      expect(portfolioItem.isOfCategory(PortfolioCategory.WEB_DESIGN)).toBe(true)
    })

    it('should return false when category does not match', () => {
      const portfolioItem = PortfolioItem.create({
        id: '1',
        title: 'Test',
        category: PortfolioCategory.WEB_DESIGN,
        image: '/test.jpg'
      })

      expect(portfolioItem.isOfCategory(PortfolioCategory.LOGO_BRANDING)).toBe(false)
    })
  })

  describe('isFeatured Method', () => {
    it('should return true when featured is true', () => {
      const portfolioItem = PortfolioItem.create({
        id: '1',
        title: 'Test',
        category: PortfolioCategory.WEB_DESIGN,
        image: '/test.jpg',
        featured: true
      })

      expect(portfolioItem.isFeatured()).toBe(true)
    })

    it('should return false when featured is undefined', () => {
      const portfolioItem = PortfolioItem.create({
        id: '1',
        title: 'Test',
        category: PortfolioCategory.WEB_DESIGN,
        image: '/test.jpg'
      })

      expect(portfolioItem.isFeatured()).toBe(false)
    })

    it('should return false when featured is explicitly false', () => {
      const portfolioItem = PortfolioItem.create({
        id: '1',
        title: 'Test',
        category: PortfolioCategory.WEB_DESIGN,
        image: '/test.jpg',
        featured: false
      })

      expect(portfolioItem.isFeatured()).toBe(false)
    })
  })

  describe('toJSON Method', () => {
    it('should convert PortfolioItem to plain object with all fields', () => {
      const data = {
        id: '1',
        title: 'Test Project',
        category: PortfolioCategory.WEB_DESIGN,
        image: '/test.jpg',
        description: 'Test description',
        featured: true,
        order: 5
      }

      const portfolioItem = PortfolioItem.create(data)
      const json = portfolioItem.toJSON()

      expect(json).toEqual(data)
    })

    it('should handle undefined optional fields in toJSON', () => {
      const data = {
        id: '1',
        title: 'Test Project',
        category: PortfolioCategory.WEB_DESIGN,
        image: '/test.jpg'
      }

      const portfolioItem = PortfolioItem.create(data)
      const json = portfolioItem.toJSON()

      expect(json.description).toBeUndefined()
      expect(json.featured).toBeUndefined()
      expect(json.order).toBeUndefined()
    })
  })
})

describe('PortfolioCategory Enum', () => {
  it('should have all expected categories', () => {
    expect(PortfolioCategory.WEB_DESIGN).toBe('web-design')
    expect(PortfolioCategory.LOGO_BRANDING).toBe('logo-branding')
    expect(PortfolioCategory.GRAPHIC_DESIGN).toBe('graphic-design')
    expect(PortfolioCategory.WEB_DEVELOPMENT).toBe('web-development')
    expect(PortfolioCategory.UX_UI).toBe('ux-ui')
    expect(PortfolioCategory.SEO).toBe('seo')
  })
})

describe('PORTFOLIO_CATEGORY_NAMES', () => {
  it('should have display names for all categories', () => {
    expect(PORTFOLIO_CATEGORY_NAMES[PortfolioCategory.WEB_DESIGN]).toBe('Web Design')
    expect(PORTFOLIO_CATEGORY_NAMES[PortfolioCategory.LOGO_BRANDING]).toBe('Logos & Branding')
    expect(PORTFOLIO_CATEGORY_NAMES[PortfolioCategory.GRAPHIC_DESIGN]).toBe('Graphic Design')
    expect(PORTFOLIO_CATEGORY_NAMES[PortfolioCategory.WEB_DEVELOPMENT]).toBe('Web Development')
    expect(PORTFOLIO_CATEGORY_NAMES[PortfolioCategory.UX_UI]).toBe('UX/UI')
    expect(PORTFOLIO_CATEGORY_NAMES[PortfolioCategory.SEO]).toBe('SEO')
  })
})
