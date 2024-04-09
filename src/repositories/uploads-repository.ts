import { Upload, Prisma } from '@prisma/client'

export interface UploadsRepository {
  create(upload: Prisma.UploadUncheckedCreateInput): Promise<Upload>
}
