import { PrismaUploadsRepository } from '@/repositories/prisma/prisma-uploads-repository'
import { UploadPetImageCase } from '../upload-pet-img'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeUploadPetImageUseCase() {
  const prismaUploadsRepository = new PrismaUploadsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new UploadPetImageCase(
    prismaUploadsRepository,
    petsRepository,
  )

  return useCase
}
