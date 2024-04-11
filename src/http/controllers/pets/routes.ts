import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middleware/verify-jwt'
import { create } from './create'
import { makePet } from 'test/factories/make-pet-factory'
import { getPet } from './get-pet'
import { searchPets } from './search-pets'
import fastifyMultipart from '@fastify/multipart'
import { upload } from './upload'

export async function petsRoutes(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fieldSize: 1_048_576 * 2, // 2 mb
    },
  })

  app.post('/pets', { onRequest: [verifyJWT] }, create)
  app.post('/pets/:id/upload', { onRequest: [verifyJWT] }, upload)

  app.get('/pets', searchPets)
  app.get('/pets/:id', getPet)
}
