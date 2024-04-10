import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgUseCase } from '../create-org'

export function makeCreateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const useCase = new CreateOrgUseCase(prismaOrgsRepository)

  return useCase
}
