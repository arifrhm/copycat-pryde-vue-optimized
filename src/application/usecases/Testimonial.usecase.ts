import type { Testimonial } from '@core/domain/entities'
import type { ITestimonialRepository } from '@core/domain/repositories'

/**
 * Testimonial Use Case
 * Implements business logic for testimonials (Single Responsibility Principle)
 * Part of the Application Layer
 */
export class TestimonialUseCase {
  constructor(private readonly testimonialRepository: ITestimonialRepository) {}

  /**
   * Get all testimonials ordered by their order field
   */
  async getAllTestimonials(): Promise<Testimonial[]> {
    const testimonials = await this.testimonialRepository.getAll()
    return testimonials.sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  /**
   * Get a testimonial by ID
   */
  async getTestimonialById(id: string): Promise<Testimonial | null> {
    return this.testimonialRepository.getById(id)
  }

  /**
   * Get featured testimonials for homepage
   */
  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    const testimonials = await this.testimonialRepository.getFeatured()
    return testimonials.sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  /**
   * Get testimonials with a minimum rating
   */
  async getTestimonialsByMinRating(minRating: number): Promise<Testimonial[]> {
    const testimonials = await this.testimonialRepository.getByMinRating(minRating)
    return testimonials.sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  /**
   * Get top-rated testimonials (for homepage display)
   */
  async getTopRatedTestimonials(limit = 6): Promise<Testimonial[]> {
    const testimonials = await this.getAllTestimonials()
    return testimonials.filter((t) => (t.rating || 0) >= 4).slice(0, limit)
  }

  /**
   * Create a new testimonial (for CMS)
   */
  async createTestimonial(
    data: Parameters<typeof this.testimonialRepository.create>[0]
  ): Promise<Testimonial> {
    return this.testimonialRepository.create(data)
  }

  /**
   * Update a testimonial (for CMS)
   */
  async updateTestimonial(
    id: string,
    data: Parameters<typeof this.testimonialRepository.update>[1]
  ): Promise<Testimonial | null> {
    return this.testimonialRepository.update(id, data)
  }

  /**
   * Delete a testimonial (for CMS)
   */
  async deleteTestimonial(id: string): Promise<boolean> {
    return this.testimonialRepository.delete(id)
  }
}
