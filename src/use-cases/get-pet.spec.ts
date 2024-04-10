import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetUseCase } from './get-pet'
import { makePet } from 'test/factories/make-pet-factory'
import { PetNotFoundError } from './errors/pet-not-found'
import { InMemoryOrgsRepository } from 'test/repositories/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: PetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet', async () => {
    const pet = await petsRepository.create(makePet())

    const result = await sut.execute({ id: pet.id })

    expect(pet).toEqual(result.pet)
  })

  it('should not be able to get a non-existing pet', async () => {
    await expect(sut.execute({ id: 'invalid-id' })).rejects.toBeInstanceOf(
      PetNotFoundError,
    )
  })
})
