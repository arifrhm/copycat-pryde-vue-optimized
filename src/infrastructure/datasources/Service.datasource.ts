import type { ServiceData } from '@core/domain/entities'

/**
 * Service Data Source
 * Mock data for services (in production, this would come from an API)
 * Part of the Infrastructure Layer
 */
export const SERVICE_DATA: ServiceData[] = [
  {
    id: '1',
    title: 'Website Design & Development',
    description:
      'A beautiful website isn\'t just about aesthetics - It needs strategy and purpose. We craft custom websites designed to captivate, guide visitors, and turn interest into action. Every detail is built with your business goals in mind.',
    icon: 'globe',
    image: '/images/services/website-design.jpg',
    order: 1
  },
  {
    id: '2',
    title: 'Logo & Brand Identity',
    description:
      'Your logo is the face of your business, and your brand identity sets the tone. We design memorable, impactful visuals that capture who you are and make a lasting impression.',
    icon: 'palette',
    image: '/images/services/logo-branding.jpg',
    order: 2
  },
  {
    id: '3',
    title: 'Website Maintenance & Support',
    description:
      'Your website should always run smoothly, securely, and up to date. Our maintenance plans keep your site fast, secure, and hassle-free-so you can focus on your business.',
    icon: 'wrench',
    image: '/images/services/maintenance.jpg',
    order: 3
  },
  {
    id: '4',
    title: 'Graphic Design (Digital & Print)',
    description:
      'High-quality design goes beyond aesthetics. It\'s about creating visuals that communicate, captivate, and drive action. From digital graphics to print-ready materials, we design to help your brand stand out and make an impact.',
    icon: 'pen-tool',
    image: '/images/services/graphic-design.jpg',
    order: 4
  }
]
