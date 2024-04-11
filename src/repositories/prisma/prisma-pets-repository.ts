import { Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(
    data: Prisma.PetUncheckedCreateInput,
    adoptionRequirements: string[],
  ) {
    const pet = await prisma.pet.create({
      data: {
        ...data,
        adoptionRequirements: {
          createMany: {
            data: adoptionRequirements.map((requirement) => ({
              requirement,
            })),
          },
        },
      },
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        adoptionRequirements: {
          select: {
            requirement: true,
          },
        },
      },
    })

    return pet
  }

  async findAll(params: FindAllParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        environment: params.environment,
        energy_level: params.energy_level,
        independence_level: params.independence_level,
        org: {
          city: {
            contains: params.city,
            // mode: 'insensitive' // TODO: When postgres remove comment
          },
        },
      },
      select: {
        id: true,
        name: true,
        age: true,
        size: true,
        environment: true,
        energy_level: true,
        independence_level: true,
        uploads: {
          select: {
            fileUrl: true,
          },
        },
      },
    })

    return pets
  }
}
