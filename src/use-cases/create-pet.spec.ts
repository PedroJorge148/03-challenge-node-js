import { makeOrg } from 'test/factories/make-org-factory'
import { InMemoryOrgsRepository } from 'test/repositories/in-memory-orgs-repository'
import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { OrgNotFoundError } from './errors/org-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
    const { id: org_id } = await orgsRepository.create(makeOrg())

    const { pet } = await sut.execute({
      name: 'Alfredo',
      species: 'dog',
      description:
        'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      age: 'filhote',
      size: 'small',
      energy_level: 'low',
      independence_level: 'low',
      environment: 'indoors',
      adoptionRequiriments: ['Local grande para o animal correr e brincar.'],
      org_id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to have a pet without a non-existing org', async () => {
    const pet = {
      name: 'Alfredo',
      species: 'dog',
      description:
        'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      age: '3',
      size: 'small',
      energy_level: 'low',
      independence_level: 'low',
      environment: 'indoors',
      adoptionRequiriments: ['Local grande para o animal correr e brincar.'],
      org_id: 'non-existing-org',
    }

    await expect(sut.execute(pet)).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
