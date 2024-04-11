import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    species: z.string(),
    description: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independence_level: z.string(),
    environment: z.string(),
    adoptionRequirements: z.array(z.string()),
  })

  const { adoptionRequirements, ...data } = createPetBodySchema.parse(
    request.body,
  )

  const { sub: org_id } = request.user

  try {
    const createPetUseCase = makeCreatePetUseCase()
    await createPetUseCase.execute({
      ...data,
      adoptionRequirements,
      org_id,
    })
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
