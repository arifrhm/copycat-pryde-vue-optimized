import type { Service } from '@core/domain/entities'
import type { IServiceRepository } from '@core/domain/repositories'

/**
 * Service Use Case
 * Implements business logic for services (Single Responsibility Principle)
 * Part of the Application Layer
 */
export class ServiceUseCase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  /**
   * Get all services ordered by their order field
   */
  async getAllServices(): Promise<Service[]> {
    const services = await this.serviceRepository.getAll()
    return services.sort((a, b) => a.order - b.order)
  }

  /**
   * Get a service by ID
   */
  async getServiceById(id: string): Promise<Service | null> {
    return this.serviceRepository.getById(id)
  }

  /**
   * Get services for display (optimized for UI)
   */
  async getServicesForDisplay(): Promise<Service[]> {
    return this.getAllServices()
  }

  /**
   * Create a new service (for CMS)
   */
  async createService(data: Parameters<typeof this.serviceRepository.create>[0]): Promise<Service> {
    return this.serviceRepository.create(data)
  }

  /**
   * Update a service (for CMS)
   */
  async updateService(
    id: string,
    data: Parameters<typeof this.serviceRepository.update>[1]
  ): Promise<Service | null> {
    return this.serviceRepository.update(id, data)
  }

  /**
   * Delete a service (for CMS)
   */
  async deleteService(id: string): Promise<boolean> {
    return this.serviceRepository.delete(id)
  }
}
