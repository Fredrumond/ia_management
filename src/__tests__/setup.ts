import { beforeAll, afterAll, afterEach } from 'vitest'
import prisma from '../lib/prisma'

beforeAll(async () => {
  console.log('🧪 Starting test environment...')
})

afterEach(async () => {

})

// Executado após todos os testes
afterAll(async () => {
  await prisma.$disconnect()
  console.log('✅ Test environment closed!')
})