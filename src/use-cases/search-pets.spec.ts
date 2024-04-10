import { makeOrg } from 'test/factories/make-org-factory'
import { makePet } from 'test/factories/make-pet-factory'
import { InMemoryOrgsRepository } from 'test/repositories/in-memory-orgs-repository'
import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPets } from './search-pets'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPets

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPets(petsRepository)
  })

  it('should be able to search for pets by city', async () => {
    const { id: org_id } = await orgsRepository.create(
      makeOrg({
        city: 'Pernambuco',
      }),
    )

    for (let i = 0; i < 4; i++) {
      await petsRepository.create(
        makePet({
          org_id,
        }),
      )
    }

    const result = await sut.execute({
      city: 'Pernambuco',
    })

    expect(result.pets).toEqual(petsRepository.items)
    expect(result.pets).toHaveLength(4)
  })

  it('should be able to search for pets by city and age', async () => {
    const { id: org_id } = await orgsRepository.create(
      makeOrg({
        city: 'Pernambuco',
      }),
    )

    await petsRepository.create(makePet({ org_id, age: '2' }))
    await petsRepository.create(makePet({ org_id }))

    const result = await sut.execute({
      city: 'Pernambuco',
      age: '2',
    })

    expect(result.pets).toHaveLength(1)
    expect(petsRepository.items).toHaveLength(2)
  })

  it('should be able to search for pets by city and size', async () => {
    const { id: org_id } = await orgsRepository.create(
      makeOrg({
        city: 'Pernambuco',
      }),
    )

    await petsRepository.create(makePet({ org_id, size: 'small' }))
    await petsRepository.create(makePet({ org_id, size: 'large' }))

    const result = await sut.execute({
      city: 'Pernambuco',
      size: 'small',
    })

    expect(result.pets).toHaveLength(1)
    expect(petsRepository.items).toHaveLength(2)
  })

  it('should be able to search for pets by city and environment', async () => {
    const { id: org_id } = await orgsRepository.create(
      makeOrg({
        city: 'Pernambuco',
      }),
    )

    await petsRepository.create(makePet({ org_id, environment: 'indoors' }))
    await petsRepository.create(makePet({ org_id, environment: 'outdoors' }))

    const result = await sut.execute({
      city: 'Pernambuco',
      environment: 'indoors',
    })

    expect(result.pets).toHaveLength(1)
    expect(petsRepository.items).toHaveLength(2)
  })

  it('should be able to search for pets by city and energy_level', async () => {
    const { id: org_id } = await orgsRepository.create(
      makeOrg({
        city: 'Pernambuco',
      }),
    )

    await petsRepository.create(makePet({ org_id, energy_level: 'low' }))
    await petsRepository.create(makePet({ org_id, energy_level: 'medium' }))

    const result = await sut.execute({
      city: 'Pernambuco',
      energy_level: 'low',
    })

    expect(result.pets).toHaveLength(1)
    expect(petsRepository.items).toHaveLength(2)
  })

  it('should be able to search for pets by city and independence_level', async () => {
    const { id: org_id } = await orgsRepository.create(
      makeOrg({
        city: 'Pernambuco',
      }),
    )

    await petsRepository.create(makePet({ org_id, independence_level: 'low' }))
    await petsRepository.create(
      makePet({ org_id, independence_level: 'medium' }),
    )

    const result = await sut.execute({
      city: 'Pernambuco',
      independence_level: 'low',
    })

    expect(result.pets).toHaveLength(1)
    expect(petsRepository.items).toHaveLength(2)
  })
})
