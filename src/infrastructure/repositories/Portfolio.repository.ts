import type { IPortfolioRepository } from '@core/domain/repositories'
import type { PortfolioItem, PortfolioItemData, PortfolioCategory } from '@core/domain/entities'
import { PortfolioItem as PortfolioItemEntity } from '@core/domain/entities'
import { PORTFOLIO_DATA } from '../datasources'

/**
 * Portfolio Repository Implementation
 * Implements the portfolio repository interface using mock data
 * In production, this would make API calls to a backend service
 * Part of the Infrastructure Layer
 */
export class PortfolioRepository implements IPortfolioRepository {
  /**
   * Get all portfolio items from the data source
   */
  async getAll(): Promise<PortfolioItem[]> {
    await this.simulateDelay()
    return PORTFOLIO_DATA.map((data) => PortfolioItemEntity.create(data))
  }

  /**
   * Get a portfolio item by ID
   */
  async getById(id: string): Promise<PortfolioItem | null> {
    await this.simulateDelay()
    const data = PORTFOLIO_DATA.find((p) => p.id === id)
    return data ? PortfolioItemEntity.create(data) : null
  }

  /**
   * Get portfolio items by category
   */
  async getByCategory(category: PortfolioCategory): Promise<PortfolioItem[]> {
    await this.simulateDelay()
    const filtered = PORTFOLIO_DATA.filter((p) => p.category === category)
    return filtered.map((data) => PortfolioItemEntity.create(data))
  }

  /**
   * Get featured portfolio items
   */
  async getFeatured(): Promise<PortfolioItem[]> {
    await this.simulateDelay()
    const featured = PORTFOLIO_DATA.filter((p) => p.featured)
    return featured.map((data) => PortfolioItemEntity.create(data))
  }

  /**
   * Create a new portfolio item (for CMS purposes)
   */
  async create(data: PortfolioItemData): Promise<PortfolioItem> {
    await this.simulateDelay()
    const newPortfolioItem = PortfolioItemEntity.create(data)
    // In production, this would make an API call to create the portfolio item
    return newPortfolioItem
  }

  /**
   * Update a portfolio item (for CMS purposes)
   */
  async update(id: string, data: Partial<PortfolioItemData>): Promise<PortfolioItem | null> {
    await this.simulateDelay()
    const existing = await this.getById(id)
    if (!existing) return null
    // In production, this would make an API call to update the portfolio item
    return PortfolioItemEntity.create({ ...existing.toJSON(), ...data })
  }

  /**
   * Delete a portfolio item (for CMS purposes)
   */
  async delete(id: string): Promise<boolean> {
    await this.simulateDelay()
    // In production, this would make an API call to delete the portfolio item
    return PORTFOLIO_DATA.some((p) => p.id === id)
  }

  /**
   * Simulate API delay for realistic behavior
   */
  private async simulateDelay(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
}
