import { Prisma } from '@prisma/client'
import { UploadsRepository } from '../uploads-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUploadsRepository implements UploadsRepository {
  async create(data: Prisma.UploadUncheckedCreateInput) {
    const upload = await prisma.upload.create({
      data,
    })

    return upload
  }
}
