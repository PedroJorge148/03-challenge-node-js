import { Pet, Prisma } from '@prisma/client'

export interface FindAllParams {
  city: string
  age?: string
  size?: string
  energy_level?: string
  independence_level?: string
  environment?: string
}

export interface PetsRepository {
  create(
    data: Prisma.PetUncheckedCreateInput,
    adoptionRequirements?: string[],
  ): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findAll(params: FindAllParams): Promise<Partial<Pet>[]>
}
