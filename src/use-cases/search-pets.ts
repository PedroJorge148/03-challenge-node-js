import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetNotFoundError } from './errors/pet-not-found'

interface SearchPetsRequest {
  city: string
  age?: string
  size?: string
  energy_level?: string
  independence_level?: string
  environment?: string
}

interface SearchPetsResponse {
  pets: Pet[]
}

export class SearchPets {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city }: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.findAll(city)

    return {
      pets,
    }
  }
}
