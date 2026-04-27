/**
 * Service Entity - Represents a service offered by the company
 * Part of the Core Domain Layer
 */
export class Service {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly icon: string,
    public readonly image: string,
    public readonly order: number
  ) {}

  /**
   * Factory method to create a Service instance
   */
  static create(data: ServiceData): Service {
    return new Service(
      data.id,
      data.title,
      data.description,
      data.icon,
      data.image,
      data.order
    )
  }

  /**
   * Convert to plain object
   */
  toJSON(): ServiceData {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      icon: this.icon,
      image: this.image,
      order: this.order
    }
  }
}

/**
 * Service Data Interface
 */
export interface ServiceData {
  id: string
  title: string
  description: string
  icon: string
  image: string
  order: number
}
