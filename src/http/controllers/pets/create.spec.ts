import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from 'test/create-and-authenticate-org'

describe('Create pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Vizsla',
        description:
          'Coerceo tenus terror accusamus aureus usitas caterva. Amicitia contabesco causa. Charisma ultio cilicium.',
        species: 'bird',
        age: '3',
        size: 'large',
        energy_level: 'medium',
        environment: 'indoors',
        independence_level: 'medium',
        adoptionRequirements: ['example-1', 'example-2'],
      })

    expect(response.statusCode).toEqual(201)
  })
})
