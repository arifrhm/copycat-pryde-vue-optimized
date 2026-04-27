/**
 * Portfolio Item Entity - Represents a portfolio project
 * Part of the Core Domain Layer
 */
export class PortfolioItem {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly category: PortfolioCategory,
    public readonly image: string,
    public readonly description?: string,
    public readonly featured?: boolean,
    public readonly order?: number
  ) {}

  /**
   * Factory method to create a PortfolioItem instance
   */
  static create(data: PortfolioItemData): PortfolioItem {
    return new PortfolioItem(
      data.id,
      data.title,
      data.category,
      data.image,
      data.description,
      data.featured,
      data.order
    )
  }

  /**
   * Check if this portfolio item belongs to a specific category
   */
  isOfCategory(category: PortfolioCategory): boolean {
    return this.category === category
  }

  /**
   * Check if this portfolio item is featured
   */
  isFeatured(): boolean {
    return this.featured || false
  }

  /**
   * Convert to plain object
   */
  toJSON(): PortfolioItemData {
    return {
      id: this.id,
      title: this.title,
      category: this.category,
      image: this.image,
      description: this.description,
      featured: this.featured,
      order: this.order
    }
  }
}

/**
 * Portfolio Item Data Interface
 */
export interface PortfolioItemData {
  id: string
  title: string
  category: PortfolioCategory
  image: string
  description?: string
  featured?: boolean
  order?: number
}

/**
 * Portfolio Category Enum
 */
export enum PortfolioCategory {
  WEB_DESIGN = 'web-design',
  LOGO_BRANDING = 'logo-branding',
  GRAPHIC_DESIGN = 'graphic-design',
  WEB_DEVELOPMENT = 'web-development',
  UX_UI = 'ux-ui',
  SEO = 'seo'
}

/**
 * Portfolio Category Display Names
 */
export const PORTFOLIO_CATEGORY_NAMES: Record<PortfolioCategory, string> = {
  [PortfolioCategory.WEB_DESIGN]: 'Web Design',
  [PortfolioCategory.LOGO_BRANDING]: 'Logos & Branding',
  [PortfolioCategory.GRAPHIC_DESIGN]: 'Graphic Design',
  [PortfolioCategory.WEB_DEVELOPMENT]: 'Web Development',
  [PortfolioCategory.UX_UI]: 'UX/UI',
  [PortfolioCategory.SEO]: 'SEO'
}
