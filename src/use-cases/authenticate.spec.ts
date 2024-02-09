import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from 'test/repositories/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: OrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
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
    })

    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await orgsRepository.create({
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
    })

    await expect(() =>
      sut.execute({
        email: 'wrong_email@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
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
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'wrong_passoword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
