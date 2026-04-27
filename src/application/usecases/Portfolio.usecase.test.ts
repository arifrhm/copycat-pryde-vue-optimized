import { describe, it, expect, vi } from 'vitest'
import { PortfolioUseCase } from './Portfolio.usecase'
import { PortfolioItem, PortfolioCategory } from '@core/domain/entities'
import type { IPortfolioRepository } from '@core/domain/repositories'

describe('PortfolioUseCase', () => {
  let mockRepository: IPortfolioRepository
  let useCase: PortfolioUseCase

  beforeEach(() => {
    mockRepository = {
      getAll: vi.fn(),
      getById: vi.fn(),
      getByCategory: vi.fn(),
      getFeatured: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    }
    useCase = new PortfolioUseCase(mockRepository)
  })

  describe('getAllPortfolioItems', () => {
    it('should return all portfolio items sorted by order', async () => {
      const items = [
        PortfolioItem.create({
          id: '3',
          title: 'Third',
          category: PortfolioCategory.WEB_DESIGN,
          image: '/3.jpg',
          order: 3
        }),
        PortfolioItem.create({
          id: '1',
          title: 'First',
          category: PortfolioCategory.WEB_DESIGN,
          image: '/1.jpg',
          order: 1
        }),
        PortfolioItem.create({
          id: '2',
          title: 'Second',
          category: PortfolioCategory.WEB_DESIGN,
          image: '/2.jpg',
          order: 2
        })
      ]
      vi.mocked(mockRepository.getAll).mockResolvedValue(items)

      const result = await useCase.getAllPortfolioItems()

      expect(result).toHaveLength(3)
      expect(result[0].id).toBe('1')
      expect(result[1].id).toBe('2')
      expect(result[2].id).toBe('3')
    })

    it('should handle items without order field', async () => {
      const items = [
        PortfolioItem.create({
          id: '2',
          title: 'Second',
          category: PortfolioCategory.WEB_DESIGN,
          image: '/2.jpg',
          order: 2
        }),
        PortfolioItem.create({
          id: '1',
          title: 'First',
          category: PortfolioCategory.WEB_DESIGN,
          image: '/1.jpg'
        })
      ]
      vi.mocked(mockRepository.getAll).mockResolvedValue(items)

      const result = await useCase.getAllPortfolioItems()

      expect(result[0].id).toBe('1') // No order = 0
      expect(result[1].id).toBe('2')
    })
  })

  describe('getPortfolioItemById', () => {
    it('should return item by id', async () => {
      const item = PortfolioItem.create({
        id: '123',
        title: 'Test',
        category: PortfolioCategory.WEB_DESIGN,
        image: '/test.jpg'
      })
      vi.mocked(mockRepository.getById).mockResolvedValue(item)

      const result = await useCase.getPortfolioItemById('123')

      expect(result).toEqual(item)
      expect(mockRepository.getById).toHaveBeenCalledWith('123')
    })

    it('should return null if not found', async () => {
      vi.mocked(mockRepository.getById).mockResolvedValue(null)

      const result = await useCase.getPortfolioItemById('999')

      expect(result).toBeNull()
    })
  })

  describe('getPortfolioItemsByCategory', () => {
    it('should return items filtered by category', async () => {
      const items = [
        PortfolioItem.create({
          id: '1',
          title: 'Web Design',
          category: PortfolioCategory.WEB_DESIGN,
          image: '/1.jpg',
          order: 1
        }),
        PortfolioItem.create({
          id: '2',
          title: 'Logo Design',
          category: PortfolioCategory.LOGO_BRANDING,
          image: '/2.jpg',
          order: 2
        })
      ]
      vi.mocked(mockRepository.getByCategory).mockResolvedValue(
        items.filter((i) => i.category === PortfolioCategory.WEB_DESIGN)
      )

      const result = await useCase.getPortfolioItemsByCategory(PortfolioCategory.WEB_DESIGN)

      expect(result).toHaveLength(1)
      expect(result[0].category).toBe(PortfolioCategory.WEB_DESIGN)
    })
  })

  describe('getFeaturedPortfolioItems', () => {
    it('should return featured items sorted', async () => {
      const items = [
        PortfolioItem.create({
          id: '2',
          title: 'Featured 2',
          category: PortfolioCategory.WEB_DESIGN,
          image: '/2.jpg',
          featured: true,
          order: 2
        }),
        PortfolioItem.create({
          id: '1',
          title: 'Featured 1',
          category: PortfolioCategory.WEB_DESIGN,
          image: '/1.jpg',
          featured: true,
          order: 1
        })
      ]
      vi.mocked(mockRepository.getFeatured).mockResolvedValue(items)

      const result = await useCase.getFeaturedPortfolioItems()

      expect(result).toHaveLength(2)
      expect(result[0].id).toBe('1')
      expect(result[1].id).toBe('2')
    })
  })

  describe('getPortfolioGroupedByCategory', () => {
    it('should group items by category', async () => {
      const items = [
        PortfolioItem.create({
          id: '1',
          title: 'Web 1',
          category: PortfolioCategory.WEB_DESIGN,
          image: '/1.jpg',
          order: 1
        }),
        PortfolioItem.create({
          id: '2',
          title: 'Logo 1',
          category: PortfolioCategory.LOGO_BRANDING,
          image: '/2.jpg',
          order: 1
        }),
        PortfolioItem.create({
          id: '3',
          title: 'Web 2',
          category: PortfolioCategory.WEB_DESIGN,
          image: '/3.jpg',
          order: 2
        })
      ]
      vi.mocked(mockRepository.getAll).mockResolvedValue(items)

      const result = await useCase.getPortfolioGroupedByCategory()

      expect(result.size).toBe(2)
      expect(result.get(PortfolioCategory.WEB_DESIGN)).toHaveLength(2)
      expect(result.get(PortfolioCategory.LOGO_BRANDING)).toHaveLength(1)
    })
  })

  describe('createPortfolioItem', () => {
    it('should create new portfolio item', async () => {
      const data = {
        id: '123',
        title: 'New Project',
        category: PortfolioCategory.WEB_DESIGN,
        image: '/new.jpg',
        order: 1
      }
      const newItem = PortfolioItem.create(data)
      vi.mocked(mockRepository.create).mockResolvedValue(newItem)

      const result = await useCase.createPortfolioItem(data)

      expect(result).toEqual(newItem)
      expect(mockRepository.create).toHaveBeenCalledWith(data)
    })
  })

  describe('updatePortfolioItem', () => {
    it('should update portfolio item', async () => {
      const updateData = {
        title: 'Updated Title'
      }
      const updatedItem = PortfolioItem.create({
        id: '123',
        title: 'Updated Title',
        category: PortfolioCategory.WEB_DESIGN,
        image: '/123.jpg'
      })
      vi.mocked(mockRepository.update).mockResolvedValue(updatedItem)

      const result = await useCase.updatePortfolioItem('123', updateData)

      expect(result).toEqual(updatedItem)
      expect(mockRepository.update).toHaveBeenCalledWith('123', updateData)
    })
  })

  describe('deletePortfolioItem', () => {
    it('should delete portfolio item', async () => {
      vi.mocked(mockRepository.delete).mockResolvedValue(true)

      const result = await useCase.deletePortfolioItem('123')

      expect(result).toBe(true)
      expect(mockRepository.delete).toHaveBeenCalledWith('123')
    })
  })
})
