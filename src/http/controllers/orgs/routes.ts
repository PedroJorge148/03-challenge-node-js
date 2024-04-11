import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { verifyJWT } from '@/http/middleware/verify-jwt'
import { register } from './register'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/orgs/authenticate', authenticate)

  app.get('/ok', { onRequest: [verifyJWT] }, (request) => {
    return request.user
  })
}
