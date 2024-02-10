import { UploadsRepository } from '@/repositories/uploads-repository'
import { Upload } from '@prisma/client'

interface UploadPetImageCaseRequest {
  title: string
  sizeInBytes: number
  storageKey: string
  pet_id?: string
}

interface UploadPetImageCaseResponse {
  upload: Upload
}

export class UploadPetImageCase {
  constructor(private uploadsRepository: UploadsRepository) {}

  async execute(
    data: UploadPetImageCaseRequest,
  ): Promise<UploadPetImageCaseResponse> {
    const upload = await this.uploadsRepository.create(data)

    if (!upload) {
      throw new Error('Error on upload file.')
    }

    return {
      upload,
    }
  }
}
