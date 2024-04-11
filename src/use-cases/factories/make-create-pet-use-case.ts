import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreatePetUseCase } from '../create-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeCreatePetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const useCase = new CreatePetUseCase(
    prismaPetsRepository,
    prismaOrgsRepository,
  )

  return useCase
}
