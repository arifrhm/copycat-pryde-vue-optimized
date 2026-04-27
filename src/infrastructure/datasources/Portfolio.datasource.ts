import type { PortfolioItemData, PortfolioCategory } from '@core/domain/entities'

/**
 * Portfolio Data Source
 * Mock data for portfolio items (in production, this would come from an API)
 * Part of the Infrastructure Layer
 */
export const PORTFOLIO_DATA: PortfolioItemData[] = [
  {
    id: '1',
    title: 'Kaleidoscape Landscaping',
    category: 'logo-branding' as PortfolioCategory,
    image: '/images/portfolio/kaleidoscape.jpg',
    description: 'Custom Logo Design',
    featured: true,
    order: 1
  },
  {
    id: '2',
    title: 'Corporate Website Redesign',
    category: 'web-design' as PortfolioCategory,
    image: '/images/portfolio/corporate-web.jpg',
    description: 'Full website redesign with modern UI/UX',
    featured: true,
    order: 2
  },
  {
    id: '3',
    title: 'Restaurant Brand Identity',
    category: 'logo-branding' as PortfolioCategory,
    image: '/images/portfolio/restaurant-brand.jpg',
    description: 'Complete brand identity package',
    featured: false,
    order: 3
  },
  {
    id: '4',
    title: 'E-commerce Platform',
    category: 'web-development' as PortfolioCategory,
    image: '/images/portfolio/ecommerce.jpg',
    description: 'Custom e-commerce solution',
    featured: true,
    order: 4
  },
  {
    id: '5',
    title: 'Marketing Campaign Design',
    category: 'graphic-design' as PortfolioCategory,
    image: '/images/portfolio/marketing.jpg',
    description: 'Digital and print marketing materials',
    featured: false,
    order: 5
  },
  {
    id: '6',
    title: 'Mobile App UI/UX',
    category: 'ux-ui' as PortfolioCategory,
    image: '/images/portfolio/mobile-app.jpg',
    description: 'Mobile application interface design',
    featured: true,
    order: 6
  },
  {
    id: '7',
    title: 'SEO Optimization',
    category: 'seo' as PortfolioCategory,
    image: '/images/portfolio/seo.jpg',
    description: 'Search engine optimization campaign',
    featured: false,
    order: 7
  },
  {
    id: '8',
    title: 'Tech Startup Brand',
    category: 'logo-branding' as PortfolioCategory,
    image: '/images/portfolio/tech-brand.jpg',
    description: 'Startup branding and identity',
    featured: true,
    order: 8
  }
]
