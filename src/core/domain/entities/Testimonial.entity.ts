/**
 * Testimonial Entity - Represents a client testimonial
 * Part of the Core Domain Layer
 */
export class Testimonial {
  constructor(
    public readonly id: string,
    public readonly content: string,
    public readonly author: string,
    public readonly company: string,
    public readonly image?: string,
    public readonly rating?: number,
    public readonly featured?: boolean,
    public readonly order?: number
  ) {}

  /**
   * Factory method to create a Testimonial instance
   */
  static create(data: TestimonialData): Testimonial {
    return new Testimonial(
      data.id,
      data.content,
      data.author,
      data.company,
      data.image,
      data.rating,
      data.featured,
      data.order
    )
  }

  /**
   * Check if this testimonial is featured
   */
  isFeatured(): boolean {
    return this.featured || false
  }

  /**
   * Get the author initials for avatar
   */
  getAuthorInitials(): string {
    const names = this.author.split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return names[0][0].toUpperCase()
  }

  /**
   * Convert to plain object
   */
  toJSON(): TestimonialData {
    return {
      id: this.id,
      content: this.content,
      author: this.author,
      company: this.company,
      image: this.image,
      rating: this.rating,
      featured: this.featured,
      order: this.order
    }
  }
}

/**
 * Testimonial Data Interface
 */
export interface TestimonialData {
  id: string
  content: string
  author: string
  company: string
  image?: string
  rating?: number
  featured?: boolean
  order?: number
}
