// import { OrgsRepository } from '@/repositories/orgs-repository'
// import {
//   AdoptionRequirement,
//   Environment,
//   Independence,
//   Pet,
//   Upload,
//   Size,
//   Energy,
//   Age,
// } from '@prisma/client'
// import { hash } from 'bcryptjs'
// import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
// import { PetsRepository } from '@/repositories/pets-repository'

// interface CreatePetUseCaseRequest {
//   name: string
//   species: string
//   description: string
//   age: Age
//   size: Size
//   energy_level: Energy
//   independence_level: Independence
//   environment: Environment
//   uploads: Upload[]
//   adoptionRequiriments: AdoptionRequirement[]
// }

// interface CreatePetUseCaseResponse {
//   pet: Pet
// }

// export class CreatePetUseCase {
//   constructor(private petsRepository: PetsRepository) {}

//   async execute(
//     props: CreatePetUseCaseRequest,
//   ): Promise<CreatePetUseCaseResponse> {
//     const pet = await this.petsRepository.create(props)

//     return {
//       org,
//     }
//   }
// }
