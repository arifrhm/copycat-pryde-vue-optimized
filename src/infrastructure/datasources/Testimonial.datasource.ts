import type { TestimonialData } from '@core/domain/entities'

/**
 * Testimonial Data Source
 * Mock data for testimonials (in production, this would come from an API)
 * Part of the Infrastructure Layer
 */
export const TESTIMONIAL_DATA: TestimonialData[] = [
  {
    id: '1',
    content:
      'Wow. Entrusting PRYDE Designs with our company\'s new logo was the best decision that my wife and I could have made. Our landscape design-build company was looking for a new logo to capture the spirit, refinement, and essence of Kaleidoscape. Angelina and Desi, plus their very qualified and kind team, have been invested and intentional from the very beginning. They have been generous with their efforts and time from our first phone consultation.',
    author: 'Julia Riordan',
    company: 'Kaleidoscape',
    image: '/images/testimonials/julia.jpg',
    rating: 5,
    featured: true,
    order: 1
  },
  {
    id: '2',
    content:
      'I could not be happier with the work PRYDE is doing. I chose Angelina and Desi because I wanted REAL people, who cared about me and my vision, to create something authentic that I could be proud of. They are nailing it in every way possible. Communication is on point, they are professional yet funny and endearing.',
    author: 'Sarah Johnson',
    company: 'Local Business Owner',
    rating: 5,
    featured: true,
    order: 2
  },
  {
    id: '3',
    content:
      'PRYDE Designs is simply amazing!! From the initial phone call to the launch of our website, the ladies of PRYDE Designs were so invested in creating me a website that not only showcased my company but me as an individual.',
    author: 'Michael Chen',
    company: 'The Rolling Fork Truck',
    rating: 5,
    featured: true,
    order: 3
  },
  {
    id: '4',
    content:
      'PRYDE Designs has an unparalleled knack for transforming ideas into visually stunning and highly functional websites. Their team of talented designers and developers consistently delivers cutting edge designs!',
    author: 'Emily Rodriguez',
    company: 'Marketing Director',
    rating: 5,
    featured: false,
    order: 4
  },
  {
    id: '5',
    content:
      'PRYDE Designs worked with our Culture Committee to create a "culture symbol" for our department. Their creativity, execution and timeliness was more than we could have ever asked for.',
    author: 'David Thompson',
    company: 'Corporate Client',
    rating: 5,
    featured: true,
    order: 5
  },
  {
    id: '6',
    content:
      'Angelina and Desi are incredible!!!! This was such a smooth, productive and helpful experience. They do fantastic work, are super collaborative, and really do care about their customers and the work they are creating.',
    author: 'Lisa Martinez',
    company: 'Small Business Owner',
    rating: 5,
    featured: false,
    order: 6
  }
]
