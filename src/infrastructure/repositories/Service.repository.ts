import type { IServiceRepository } from '@core/domain/repositories'
import type { Service, ServiceData } from '@core/domain/entities'
import { Service as ServiceEntity } from '@core/domain/entities'
import { SERVICE_DATA } from '../datasources'

/**
 * Service Repository Implementation
 * Implements the service repository interface using mock data
 * In production, this would make API calls to a backend service
 * Part of the Infrastructure Layer
 */
export class ServiceRepository implements IServiceRepository {
  /**
   * Get all services from the data source
   */
  async getAll(): Promise<Service[]> {
    // Simulate API delay
    await this.simulateDelay()
    return SERVICE_DATA.map((data) => ServiceEntity.create(data))
  }

  /**
   * Get a service by ID
   */
  async getById(id: string): Promise<Service | null> {
    await this.simulateDelay()
    const data = SERVICE_DATA.find((s) => s.id === id)
    return data ? ServiceEntity.create(data) : null
  }

  /**
   * Get services by category (placeholder for future functionality)
   */
  async getByCategory(_category: string): Promise<Service[]> {
    await this.simulateDelay()
    return this.getAll()
  }

  /**
   * Create a new service (for CMS purposes)
   */
  async create(data: ServiceData): Promise<Service> {
    await this.simulateDelay()
    const newService = ServiceEntity.create(data)
    // In production, this would make an API call to create the service
    return newService
  }

  /**
   * Update a service (for CMS purposes)
   */
  async update(id: string, data: Partial<ServiceData>): Promise<Service | null> {
    await this.simulateDelay()
    const existing = await this.getById(id)
    if (!existing) return null
    // In production, this would make an API call to update the service
    return ServiceEntity.create({ ...existing.toJSON(), ...data })
  }

  /**
   * Delete a service (for CMS purposes)
   */
  async delete(id: string): Promise<boolean> {
    await this.simulateDelay()
    // In production, this would make an API call to delete the service
    return SERVICE_DATA.some((s) => s.id === id)
  }

  /**
   * Simulate API delay for realistic behavior
   */
  private async simulateDelay(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
}
