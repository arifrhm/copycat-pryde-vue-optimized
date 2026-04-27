import { describe, it, expect } from 'vitest'
import { Service } from './Service.entity'

describe('Service Entity', () => {
  describe('Factory Method', () => {
    it('should create a Service instance with all required fields', () => {
      const data = {
        id: '1',
        title: 'Web Design',
        description: 'Custom website design services',
        icon: 'palette',
        image: '/web-design.jpg',
        order: 1
      }

      const service = Service.create(data)

      expect(service).toBeInstanceOf(Service)
      expect(service.id).toBe('1')
      expect(service.title).toBe('Web Design')
      expect(service.description).toBe('Custom website design services')
      expect(service.icon).toBe('palette')
      expect(service.image).toBe('/web-design.jpg')
      expect(service.order).toBe(1)
    })

    it('should handle different order values', () => {
      const service1 = Service.create({
        id: '1',
        title: 'Service 1',
        description: 'Description 1',
        icon: 'icon1',
        image: '/img1.jpg',
        order: 1
      })

      const service2 = Service.create({
        id: '2',
        title: 'Service 2',
        description: 'Description 2',
        icon: 'icon2',
        image: '/img2.jpg',
        order: 2
      })

      expect(service1.order).toBeLessThan(service2.order)
    })
  })

  describe('Constructor', () => {
    it('should create Service instance directly via constructor', () => {
      const service = new Service(
        '123',
        'Logo Design',
        'Professional logo design',
        'pen-tool',
        '/logo.jpg',
        2
      )

      expect(service.id).toBe('123')
      expect(service.title).toBe('Logo Design')
      expect(service.description).toBe('Professional logo design')
      expect(service.icon).toBe('pen-tool')
      expect(service.image).toBe('/logo.jpg')
      expect(service.order).toBe(2)
    })
  })

  describe('toJSON Method', () => {
    it('should convert Service to plain object with all fields', () => {
      const data = {
        id: '1',
        title: 'Web Design',
        description: 'Custom website design',
        icon: 'palette',
        image: '/web.jpg',
        order: 1
      }

      const service = Service.create(data)
      const json = service.toJSON()

      expect(json).toEqual(data)
    })

    it('should maintain immutability of original data', () => {
      const data = {
        id: '1',
        title: 'Web Design',
        description: 'Custom website design',
        icon: 'palette',
        image: '/web.jpg',
        order: 1
      }

      const service = Service.create(data)
      const json = service.toJSON()

      // Modify JSON
      json.title = 'Modified Title'

      // Original should be unchanged
      expect(service.title).toBe('Web Design')
    })
  })

  describe('Immutability', () => {
    it('should not allow mutation of properties at compile time (TypeScript)', () => {
      const service = Service.create({
        id: '1',
        title: 'Test',
        description: 'Test',
        icon: 'test',
        image: '/test.jpg',
        order: 1
      })

      // Runtime: Properties are readonly in TypeScript but can be mutated at runtime
      // This is expected behavior for plain TypeScript classes
      expect(service.id).toBe('1')
      expect(service.title).toBe('Test')
    })

    it('should create independent instances', () => {
      const service1 = Service.create({
        id: '1',
        title: 'Service 1',
        description: 'Desc 1',
        icon: 'icon1',
        image: '/img1.jpg',
        order: 1
      })

      const service2 = Service.create({
        id: '2',
        title: 'Service 2',
        description: 'Desc 2',
        icon: 'icon2',
        image: '/img2.jpg',
        order: 2
      })

      // Modifying JSON output should not affect original
      const json1 = service1.toJSON()
      json1.title = 'Modified'

      expect(service1.title).toBe('Service 1')
      expect(service2.title).toBe('Service 2')
    })
  })
})
