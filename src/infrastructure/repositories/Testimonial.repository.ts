import type { ITestimonialRepository } from '@core/domain/repositories'
import type { Testimonial, TestimonialData } from '@core/domain/entities'
import { Testimonial as TestimonialEntity } from '@core/domain/entities'
import { TESTIMONIAL_DATA } from '../datasources'

/**
 * Testimonial Repository Implementation
 * Implements the testimonial repository interface using mock data
 * In production, this would make API calls to a backend service
 * Part of the Infrastructure Layer
 */
export class TestimonialRepository implements ITestimonialRepository {
  /**
   * Get all testimonials from the data source
   */
  async getAll(): Promise<Testimonial[]> {
    await this.simulateDelay()
    return TESTIMONIAL_DATA.map((data) => TestimonialEntity.create(data))
  }

  /**
   * Get a testimonial by ID
   */
  async getById(id: string): Promise<Testimonial | null> {
    await this.simulateDelay()
    const data = TESTIMONIAL_DATA.find((t) => t.id === id)
    return data ? TestimonialEntity.create(data) : null
  }

  /**
   * Get featured testimonials
   */
  async getFeatured(): Promise<Testimonial[]> {
    await this.simulateDelay()
    const featured = TESTIMONIAL_DATA.filter((t) => t.featured)
    return featured.map((data) => TestimonialEntity.create(data))
  }

  /**
   * Get testimonials with a minimum rating
   */
  async getByMinRating(rating: number): Promise<Testimonial[]> {
    await this.simulateDelay()
    const filtered = TESTIMONIAL_DATA.filter((t) => (t.rating || 0) >= rating)
    return filtered.map((data) => TestimonialEntity.create(data))
  }

  /**
   * Create a new testimonial (for CMS purposes)
   */
  async create(data: TestimonialData): Promise<Testimonial> {
    await this.simulateDelay()
    const newTestimonial = TestimonialEntity.create(data)
    // In production, this would make an API call to create the testimonial
    return newTestimonial
  }

  /**
   * Update a testimonial (for CMS purposes)
   */
  async update(id: string, data: Partial<TestimonialData>): Promise<Testimonial | null> {
    await this.simulateDelay()
    const existing = await this.getById(id)
    if (!existing) return null
    // In production, this would make an API call to update the testimonial
    return TestimonialEntity.create({ ...existing.toJSON(), ...data })
  }

  /**
   * Delete a testimonial (for CMS purposes)
   */
  async delete(id: string): Promise<boolean> {
    await this.simulateDelay()
    // In production, this would make an API call to delete the testimonial
    return TESTIMONIAL_DATA.some((t) => t.id === id)
  }

  /**
   * Simulate API delay for realistic behavior
   */
  private async simulateDelay(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
}
