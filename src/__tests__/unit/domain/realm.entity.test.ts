import { describe, it, expect } from 'vitest'
import { Realm as RealmEntity } from '../../../domain/realm/realm.entity'

const realmData = {
  name: 'My Realm'
}

describe('Realm Entity', () => {
  describe('create', () => {
    it('should create a valid realm', () => {
      const realm = RealmEntity.create(realmData.name)

      expect(realm.name).toBe('My Realm')
      expect(realm.id).toBe(null)
      expect(realm.createdAt).toBeInstanceOf(Date)
      expect(realm.updatedAt).toBeInstanceOf(Date)
      expect(realm.createdAt.getTime()).toBe(realm.updatedAt.getTime())
    })

    it('should throw error if name has less than 3 characters', () => {
      expect(() => RealmEntity.create('Ab')).toThrow('Name must have at least 3 characters')
    })

    it('should throw error if name is empty', () => {
      expect(() => RealmEntity.create('')).toThrow('Name must have at least 3 characters')
    })

    it('should throw error if name has only spaces', () => {
      expect(() => RealmEntity.create('   ')).toThrow('Name must have at least 3 characters')
    })

    it('should throw error if name has more than 100 characters', () => {
      const longName = 'A'.repeat(101)
      expect(() => RealmEntity.create(longName)).toThrow('Name must have at most 100 characters')
    })

    it('should accept name with exactly 3 characters', () => {
      const realm = RealmEntity.create('ABC')
      expect(realm.name).toBe('ABC')
    })

    it('should accept name with exactly 100 characters', () => {
      const name = 'A'.repeat(100)
      const realm = RealmEntity.create(name)
      expect(realm.name).toBe(name)
    })

    it('should trim spaces from name before validation', () => {
      const realm = RealmEntity.create('  My Realm  ')
      expect(realm.name).toBe('  My Realm  ')
    })
  })

  describe('restore', () => {
    it('should restore a realm with all properties', () => {
      const createdAt = new Date('2024-01-01')
      const updatedAt = new Date('2024-01-02')
      const realm = RealmEntity.restore(
        1,
        'My Realm',
        createdAt,
        updatedAt
      )

      expect(realm.id).toBe(1)
      expect(realm.name).toBe('My Realm')
      expect(realm.createdAt).toEqual(createdAt)
      expect(realm.updatedAt).toEqual(updatedAt)
    })

    it('should throw error when restoring with invalid name (less than 3 characters)', () => {
      expect(() => {
        RealmEntity.restore(
          1,
          'Ab',
          new Date('2024-01-01'),
          new Date('2024-01-02')
        )
      }).toThrow('Name must have at least 3 characters')
    })

    it('should throw error when restoring with empty name', () => {
      expect(() => {
        RealmEntity.restore(
          1,
          '',
          new Date('2024-01-01'),
          new Date('2024-01-02')
        )
      }).toThrow('Name must have at least 3 characters')
    })

    it('should throw error when restoring with name that has only spaces', () => {
      expect(() => {
        RealmEntity.restore(
          1,
          '   ',
          new Date('2024-01-01'),
          new Date('2024-01-02')
        )
      }).toThrow('Name must have at least 3 characters')
    })

    it('should throw error when restoring with name longer than 100 characters', () => {
      const longName = 'A'.repeat(101)
      expect(() => {
        RealmEntity.restore(
          1,
          longName,
          new Date('2024-01-01'),
          new Date('2024-01-02')
        )
      }).toThrow('Name must have at most 100 characters')
    })

    it('should restore realm with valid name at minimum length', () => {
      const realm = RealmEntity.restore(
        1,
        'ABC',
        new Date('2024-01-01'),
        new Date('2024-01-02')
      )

      expect(realm.name).toBe('ABC')
    })

    it('should restore realm with valid name at maximum length', () => {
      const name = 'A'.repeat(100)
      const realm = RealmEntity.restore(
        1,
        name,
        new Date('2024-01-01'),
        new Date('2024-01-02')
      )

      expect(realm.name).toBe(name)
    })
  })
})
