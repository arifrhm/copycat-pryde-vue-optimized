import type { Testimonial, TestimonialData } from '../entities'

/**
 * Testimonial Repository Interface
 * Defines the contract for testimonial data operations (Interface Segregation Principle)
 * Part of the Core Domain Layer
 */
export interface ITestimonialRepository {
  /**
   * Get all testimonials
   */
  getAll(): Promise<Testimonial[]>

  /**
   * Get a testimonial by ID
   */
  getById(id: string): Promise<Testimonial | null>

  /**
   * Get featured testimonials
   */
  getFeatured(): Promise<Testimonial[]>

  /**
   * Get testimonials with a minimum rating
   */
  getByMinRating(rating: number): Promise<Testimonial[]>

  /**
   * Create a new testimonial (for CMS purposes)
   */
  create(data: TestimonialData): Promise<Testimonial>

  /**
   * Update a testimonial (for CMS purposes)
   */
  update(id: string, data: Partial<TestimonialData>): Promise<Testimonial | null>

  /**
   * Delete a testimonial (for CMS purposes)
   */
  delete(id: string): Promise<boolean>
}
