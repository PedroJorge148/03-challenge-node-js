import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from 'test/create-and-authenticate-org'

describe('Get pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet by id', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server)
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

    const search = await request(app.server)
      .get('/pets')
      .query({ city: 'Recife' }) // Default city value on create org function
      .send()

    const pet_id = search.body.pets[0].id

    const response = await request(app.server).get(`/pets/${pet_id}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: pet_id,
        name: 'Vizsla',
      }),
    )
  })
})
