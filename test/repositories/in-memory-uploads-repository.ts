import { UploadsRepository } from '@/repositories/uploads-repository'
import { Upload, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryUploadsRepository implements UploadsRepository {
  public items: Upload[] = []

  async create(data: Prisma.UploadUncheckedCreateInput) {
    const upload = {
      id: data.id ?? randomUUID(),
      title: data.title,
      sizeInBytes: data.sizeInBytes,
      storageKey: data.storageKey,
      fileUrl: data.fileUrl,
      pet_id: data.pet_id,
    }

    this.items.push(upload)

    return upload
  }
}
