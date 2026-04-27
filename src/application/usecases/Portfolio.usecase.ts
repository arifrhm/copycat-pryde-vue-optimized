import type { PortfolioItem, PortfolioCategory } from '@core/domain/entities'
import type { IPortfolioRepository } from '@core/domain/repositories'

/**
 * Portfolio Use Case
 * Implements business logic for portfolio items (Single Responsibility Principle)
 * Part of the Application Layer
 */
export class PortfolioUseCase {
  constructor(private readonly portfolioRepository: IPortfolioRepository) {}

  /**
   * Get all portfolio items ordered by their order field
   */
  async getAllPortfolioItems(): Promise<PortfolioItem[]> {
    const items = await this.portfolioRepository.getAll()
    return items.sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  /**
   * Get a portfolio item by ID
   */
  async getPortfolioItemById(id: string): Promise<PortfolioItem | null> {
    return this.portfolioRepository.getById(id)
  }

  /**
   * Get portfolio items by category
   */
  async getPortfolioItemsByCategory(category: PortfolioCategory): Promise<PortfolioItem[]> {
    const items = await this.portfolioRepository.getByCategory(category)
    return items.sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  /**
   * Get featured portfolio items for homepage
   */
  async getFeaturedPortfolioItems(): Promise<PortfolioItem[]> {
    const items = await this.portfolioRepository.getFeatured()
    return items.sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  /**
   * Get portfolio items grouped by category for display
   */
  async getPortfolioGroupedByCategory(): Promise<Map<PortfolioCategory, PortfolioItem[]>> {
    const items = await this.getAllPortfolioItems()
    const grouped = new Map<PortfolioCategory, PortfolioItem[]>()

    for (const item of items) {
      const categoryItems = grouped.get(item.category) || []
      categoryItems.push(item)
      grouped.set(item.category, categoryItems)
    }

    return grouped
  }

  /**
   * Create a new portfolio item (for CMS)
   */
  async createPortfolioItem(
    data: Parameters<typeof this.portfolioRepository.create>[0]
  ): Promise<PortfolioItem> {
    return this.portfolioRepository.create(data)
  }

  /**
   * Update a portfolio item (for CMS)
   */
  async updatePortfolioItem(
    id: string,
    data: Parameters<typeof this.portfolioRepository.update>[1]
  ): Promise<PortfolioItem | null> {
    return this.portfolioRepository.update(id, data)
  }

  /**
   * Delete a portfolio item (for CMS)
   */
  async deletePortfolioItem(id: string): Promise<boolean> {
    return this.portfolioRepository.delete(id)
  }
}
