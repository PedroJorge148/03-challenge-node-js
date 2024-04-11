import { PetsRepository } from '@/repositories/pets-repository'
import { UploadsRepository } from '@/repositories/uploads-repository'
import { Upload } from '@prisma/client'
import { PetNotFoundError } from './errors/pet-not-found'

interface UploadPetImageCaseRequest {
  title: string
  storageKey: string
  fileUrl: string
  pet_id: string
}

interface UploadPetImageCaseResponse {
  upload: Upload
}

export class UploadPetImageCase {
  constructor(
    private uploadsRepository: UploadsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute(
    data: UploadPetImageCaseRequest,
  ): Promise<UploadPetImageCaseResponse> {
    const doesPetExists = this.petsRepository.findById(data.pet_id)

    if (!doesPetExists) {
      throw new PetNotFoundError()
    }

    const upload = await this.uploadsRepository.create(data)

    if (!upload) {
      throw new Error('Error on upload file.')
    }

    return {
      upload,
    }
  }
}
