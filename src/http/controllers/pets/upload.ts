import { PetNotFoundError } from '@/use-cases/errors/pet-not-found'
import { makeUploadPetImageUseCase } from '@/use-cases/factories/make-upload-pet-img-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import { z } from 'zod'

const pump = promisify(pipeline)

export async function upload(request: FastifyRequest, reply: FastifyReply) {
  const uploadParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = uploadParamsSchema.parse(request.params)

  const data = await request.file()

  if (!data || !id) {
    return reply.status(400).send({ message: 'Missing params or file upload.' })
  }

  const extension = path.extname(data.filename)

  if (!['.png', '.jpg', '.jpeg'].includes(extension)) {
    return reply.status(400).send({ message: 'Invalid input type.' })
  }

  const fileBaseName = path.basename(data.filename, extension)
  const storageKey = randomUUID()

  const fileUploadName = `${storageKey}-${fileBaseName}${extension}`
  const uploadDestination = path.resolve(
    __dirname,
    '../../../../tmp/uploads',
    fileUploadName,
  )

  try {
    const uploadPetImageUseCase = makeUploadPetImageUseCase()

    const { upload } = await uploadPetImageUseCase.execute({
      title: fileBaseName,
      storageKey,
      fileUrl: uploadDestination,
      pet_id: id,
    })

    await pump(data.file, createWriteStream(uploadDestination))

    return reply.status(201).send({ upload })
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
