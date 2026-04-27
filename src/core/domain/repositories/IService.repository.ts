import type { Service, ServiceData } from '../entities'

/**
 * Service Repository Interface
 * Defines the contract for service data operations (Interface Segregation Principle)
 * Part of the Core Domain Layer
 */
export interface IServiceRepository {
  /**
   * Get all services
   */
  getAll(): Promise<Service[]>

  /**
   * Get a service by ID
   */
  getById(id: string): Promise<Service | null>

  /**
   * Get services by category (if applicable)
   */
  getByCategory(category: string): Promise<Service[]>

  /**
   * Create a new service (for CMS purposes)
   */
  create(data: ServiceData): Promise<Service>

  /**
   * Update a service (for CMS purposes)
   */
  update(id: string, data: Partial<ServiceData>): Promise<Service | null>

  /**
   * Delete a service (for CMS purposes)
   */
  delete(id: string): Promise<boolean>
}
