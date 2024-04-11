import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      name: 'Seu Cãopanheiro',
      owner: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      phone: '(81) 91234-5678',
      number: '123',
      address: 'Rua do meio',
      city: 'Recife',
      state: 'PE',
      zipcode: '13254-000',
    },
  })

  const authResponse = await request(app.server)
    .post('/orgs/authenticate')
    .send({
      email: 'johndoe@example.com',
      password: '123456',
    })

  const { token } = authResponse.body

  return {
    token,
  }
}
