import type { PortfolioItem, PortfolioItemData, PortfolioCategory } from '../entities'

/**
 * Portfolio Repository Interface
 * Defines the contract for portfolio data operations (Interface Segregation Principle)
 * Part of the Core Domain Layer
 */
export interface IPortfolioRepository {
  /**
   * Get all portfolio items
   */
  getAll(): Promise<PortfolioItem[]>

  /**
   * Get a portfolio item by ID
   */
  getById(id: string): Promise<PortfolioItem | null>

  /**
   * Get portfolio items by category
   */
  getByCategory(category: PortfolioCategory): Promise<PortfolioItem[]>

  /**
   * Get featured portfolio items
   */
  getFeatured(): Promise<PortfolioItem[]>

  /**
   * Create a new portfolio item (for CMS purposes)
   */
  create(data: PortfolioItemData): Promise<PortfolioItem>

  /**
   * Update a portfolio item (for CMS purposes)
   */
  update(id: string, data: Partial<PortfolioItemData>): Promise<PortfolioItem | null>

  /**
   * Delete a portfolio item (for CMS purposes)
   */
  delete(id: string): Promise<boolean>
}
