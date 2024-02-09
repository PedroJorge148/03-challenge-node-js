import { OrgsRepository } from '@/repositories/orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { InMemoryOrgsRepository } from 'test/repositories/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: OrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create an org', async () => {
    const { org } = await sut.execute({
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

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
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

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should hash org password upon registration', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      email,
      name: 'Seu Cãopanheiro',
      owner: 'John Doe',
      password: '123456',
      phone: '(81) 91234-5678',
      number: '123',
      address: 'Rua do meio',
      city: 'Recife',
      state: 'PE',
      zipcode: '13254-000',
    })

    await expect(() =>
      sut.execute({
        email,
        name: 'Seu Cãopanheiro',
        owner: 'John Doe',
        password: '123456',
        phone: '(81) 91234-5678',
        number: '123',
        address: 'Rua do meio',
        city: 'Recife',
        state: 'PE',
        zipcode: '13254-000',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
