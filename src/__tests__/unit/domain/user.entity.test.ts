import { describe, it, expect } from 'vitest'
import { User as UserEntity } from '../../../domain/user/user.entity'

const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  status: 'ACTIVE',
  realmId: 1
}

describe('User Entity', () => {
  describe('create', () => {
    it('should create a valid user', () => {
      const user = UserEntity.create(userData.name, userData.email, userData.password, userData.realmId)

      expect(user.name).toBe('John Doe')
      expect(user.email).toBe('john@example.com')
      expect(user.isActive).toBe(true)
      expect(user.realmId).toBe(1)
      expect(user.createdAt).toBeInstanceOf(Date)
    })

    it('should throw error if name has less than 3 characters', () => {
      const testData = { ...userData, name: 'Jo' }

      expect(() => UserEntity.create(testData.name, testData.email, testData.password, testData.realmId)).toThrow('Name must have at least 3 characters')
    })

    it('should throw error if name is empty', () => {
      const testData = { ...userData, name: '' }

      expect(() => UserEntity.create(testData.name, testData.email, testData.password, testData.realmId)).toThrow('Name must have at least 3 characters')
    })

    it('should throw error if email is invalid', () => {
      const testData = { ...userData, email: 'invalid-email' }

      expect(() => UserEntity.create(testData.name, testData.email, testData.password, testData.realmId)).toThrow('Invalid email format')
    })

    it('should throw error if email is empty', () => {
      const testData = { ...userData, email: '' }

      expect(() => UserEntity.create(testData.name, testData.email, testData.password, testData.realmId)).toThrow('Invalid email format')
    })

    it('should throw error if password has less than 6 characters', () => {
      const testData = { ...userData, password: '12345' }

      expect(() => UserEntity.create(testData.name, testData.email, testData.password, testData.realmId)).toThrow('Password must have at least 6 characters')
    })

    it('should throw error if password is empty', () => {
      const testData = { ...userData, password: '' }

      expect(() => UserEntity.create(testData.name, testData.email, testData.password, testData.realmId)).toThrow('Password must have at least 6 characters')
    })

    it('should throw error if name has only spaces', () => {
      const testData = { ...userData, name: '   ' }

      expect(() => UserEntity.create(testData.name, testData.email, testData.password, testData.realmId)).toThrow('Name must have at least 3 characters')
    })
  })

  describe('restore', () => {
    it('should restore a user with ACTIVE status', () => {
      const user = UserEntity.restore(
        1,
        'John Doe',
        'john@example.com',
        'password123',
        'ACTIVE',
        1,
        new Date('2024-01-01')
      )

      expect(user.id).toBe(1)
      expect(user.name).toBe('John Doe')
      expect(user.email).toBe('john@example.com')
      expect(user.status).toBe('ACTIVE')
      expect(user.isActive).toBe(true)
      expect(user.realmId).toBe(1)
      expect(user.createdAt).toEqual(new Date('2024-01-01'))
    })

    it('should restore a user with INACTIVE status', () => {
      const user = UserEntity.restore(
        1,
        'John Doe',
        'john@example.com',
        'password123',
        'INACTIVE',
        1,
        new Date('2024-01-01')
      )

      expect(user.id).toBe(1)
      expect(user.status).toBe('INACTIVE')
      expect(user.isActive).toBe(false)
    })

    it('should throw error when restoring with invalid name', () => {
      expect(() => {
        UserEntity.restore(
          1,
          'Jo',
          'john@example.com',
          'password123',
          'ACTIVE',
          1,
          new Date('2024-01-01')
        )
      }).toThrow('Name must have at least 3 characters')
    })

    it('should throw error when restoring with invalid email', () => {
      expect(() => {
        UserEntity.restore(
          1,
          'John Doe',
          'invalid-email',
          'password123',
          'ACTIVE',
          1,
          new Date('2024-01-01')
        )
      }).toThrow('Invalid email format')
    })

    it('should throw error when restoring with invalid password', () => {
      expect(() => {
        UserEntity.restore(
          1,
          'John Doe',
          'john@example.com',
          '12345',
          'ACTIVE',
          1,
          new Date('2024-01-01')
        )
      }).toThrow('Password must have at least 6 characters')
    })
  })

  describe('deactivate', () => {
    it('should deactivate an active user', () => {
      const user = UserEntity.create('John Doe', 'john@example.com', 'password123', 1)

      user.deactivate()

      expect(user.isActive).toBe(false)
      expect(user.status).toBe('INACTIVE')
    })

    it('should throw error when trying to deactivate an already inactive user', () => {
      const user = UserEntity.restore(
        1,
        'John Doe',
        'john@example.com',
        'password123',
        'INACTIVE', 
        1,
        new Date('2024-01-01')
      )

      expect(() => user.deactivate()).toThrow('User already inactive')
    })
  })

  describe('activate', () => {
    it('should activate an inactive user', () => {
      const user = UserEntity.create('John Doe', 'john@example.com', 'password123', 1)

      user.deactivate()
      user.activate()

      expect(user.isActive).toBe(true)
      expect(user.status).toBe('ACTIVE')
    })

    it('should throw error when trying to activate an already active user', () => {
      const user = UserEntity.create('John Doe', 'john@example.com', 'password123', 1)

      expect(() => user.activate()).toThrow('User already active')
    })
  })

  describe('isActive', () => {
    it('should return true when user status is ACTIVE', () => {
      const user = UserEntity.create('John Doe', 'john@example.com', 'password123', 1)

      expect(user.isActive).toBe(true)
    })

    it('should return false when user status is INACTIVE', () => {
      const user = UserEntity.restore(
        1,
        'John Doe',
        'john@example.com',
        'password123',
        'INACTIVE',
        1,
        new Date('2024-01-01')
      )

      expect(user.isActive).toBe(false)
    })
  })
})