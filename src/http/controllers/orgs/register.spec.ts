import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register an org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Seu Cãopanheiro',
      owner: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '(81) 91234-5678',
      number: '123',
      address: 'Rua do meio',
      city: 'Recife',
      state: 'PE',
      zipcode: '13254-000',
    })

    expect(response.statusCode).toEqual(201)
  })
})
