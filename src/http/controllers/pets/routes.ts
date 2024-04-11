import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middleware/verify-jwt.js'
import { create } from './create'
import { makePet } from 'test/factories/make-pet-factory'
import { getPet } from './get-pet'
import { searchPets } from './search-pets'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, create)

  app.get('/pets', searchPets)
  app.get('/pets/:id', getPet)

  // TODO: Remove this route
  app.get('/example-pet', () => {
    const pet = makePet()
    return pet
  })
}
