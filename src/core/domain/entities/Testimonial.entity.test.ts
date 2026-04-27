import { describe, it, expect } from 'vitest'
import { Testimonial } from './Testimonial.entity'

describe('Testimonial Entity', () => {
  describe('Factory Method', () => {
    it('should create a Testimonial instance with all required fields', () => {
      const data = {
        id: '1',
        content: 'Great service!',
        author: 'John Doe',
        company: 'Acme Corp'
      }

      const testimonial = Testimonial.create(data)

      expect(testimonial).toBeInstanceOf(Testimonial)
      expect(testimonial.id).toBe('1')
      expect(testimonial.content).toBe('Great service!')
      expect(testimonial.author).toBe('John Doe')
      expect(testimonial.company).toBe('Acme Corp')
    })

    it('should create a Testimonial with optional fields', () => {
      const data = {
        id: '2',
        content: 'Amazing work!',
        author: 'Jane Smith',
        company: 'Tech Inc',
        image: '/jane.jpg',
        rating: 5,
        featured: true,
        order: 1
      }

      const testimonial = Testimonial.create(data)

      expect(testimonial.image).toBe('/jane.jpg')
      expect(testimonial.rating).toBe(5)
      expect(testimonial.featured).toBe(true)
      expect(testimonial.order).toBe(1)
    })

    it('should handle rating values from 1 to 5', () => {
      const ratings = [1, 2, 3, 4, 5]

      ratings.forEach((rating) => {
        const testimonial = Testimonial.create({
          id: `${rating}`,
          content: 'Test',
          author: 'Test Author',
          company: 'Test Company',
          rating
        })

        expect(testimonial.rating).toBe(rating)
      })
    })
  })

  describe('isFeatured Method', () => {
    it('should return true when featured is true', () => {
      const testimonial = Testimonial.create({
        id: '1',
        content: 'Great!',
        author: 'John',
        company: 'Acme',
        featured: true
      })

      expect(testimonial.isFeatured()).toBe(true)
    })

    it('should return false when featured is undefined', () => {
      const testimonial = Testimonial.create({
        id: '1',
        content: 'Great!',
        author: 'John',
        company: 'Acme'
      })

      expect(testimonial.isFeatured()).toBe(false)
    })

    it('should return false when featured is explicitly false', () => {
      const testimonial = Testimonial.create({
        id: '1',
        content: 'Great!',
        author: 'John',
        company: 'Acme',
        featured: false
      })

      expect(testimonial.isFeatured()).toBe(false)
    })
  })

  describe('getAuthorInitials Method', () => {
    it('should return initials for two-part name', () => {
      const testimonial = Testimonial.create({
        id: '1',
        content: 'Great!',
        author: 'John Doe',
        company: 'Acme'
      })

      expect(testimonial.getAuthorInitials()).toBe('JD')
    })

    it('should return initials for three-part name', () => {
      const testimonial = Testimonial.create({
        id: '1',
        content: 'Great!',
        author: 'John Middle Doe',
        company: 'Acme'
      })

      // Should take first and last name initials
      expect(testimonial.getAuthorInitials()).toBe('JD')
    })

    it('should return single initial for one-part name', () => {
      const testimonial = Testimonial.create({
        id: '1',
        content: 'Great!',
        author: 'Madonna',
        company: 'Entertainment'
      })

      expect(testimonial.getAuthorInitials()).toBe('M')
    })

    it('should convert to uppercase', () => {
      const testimonial = Testimonial.create({
        id: '1',
        content: 'Great!',
        author: 'john doe',
        company: 'Acme'
      })

      expect(testimonial.getAuthorInitials()).toBe('JD')
    })

    it('should handle names with multiple spaces', () => {
      const testimonial = Testimonial.create({
        id: '1',
        content: 'Great!',
        author: 'John  Doe',
        company: 'Acme'
      })

      expect(testimonial.getAuthorInitials()).toBe('JD')
    })
  })

  describe('toJSON Method', () => {
    it('should convert Testimonial to plain object with all fields', () => {
      const data = {
        id: '1',
        content: 'Great service!',
        author: 'John Doe',
        company: 'Acme Corp',
        image: '/john.jpg',
        rating: 5,
        featured: true,
        order: 1
      }

      const testimonial = Testimonial.create(data)
      const json = testimonial.toJSON()

      expect(json).toEqual(data)
    })

    it('should handle undefined optional fields in toJSON', () => {
      const data = {
        id: '1',
        content: 'Great!',
        author: 'John',
        company: 'Acme'
      }

      const testimonial = Testimonial.create(data)
      const json = testimonial.toJSON()

      expect(json.image).toBeUndefined()
      expect(json.rating).toBeUndefined()
      expect(json.featured).toBeUndefined()
      expect(json.order).toBeUndefined()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty string content', () => {
      const testimonial = Testimonial.create({
        id: '1',
        content: '',
        author: 'John',
        company: 'Acme'
      })

      expect(testimonial.content).toBe('')
    })

    it('should handle very long content', () => {
      const longContent = 'A'.repeat(1000)

      const testimonial = Testimonial.create({
        id: '1',
        content: longContent,
        author: 'John',
        company: 'Acme'
      })

      expect(testimonial.content).toBe(longContent)
    })

    it('should handle special characters in author name', () => {
      const testimonial = Testimonial.create({
        id: '1',
        content: 'Great!',
        author: "John O'Brien",
        company: 'Acme'
      })

      expect(testimonial.author).toBe("John O'Brien")
      expect(testimonial.getAuthorInitials()).toBe("JO")
    })
  })
})
