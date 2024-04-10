import { FastifyInstance } from 'fastify'
import { create } from './create.ts'
import { authenticate } from './authenticate.js'
import { verifyJWT } from '@/http/middleware/verify-jwt.js'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/orgs/authenticate', authenticate)

  app.get('/ok', { onRequest: [verifyJWT] }, () => 'ok')
}
