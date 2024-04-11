import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    independence_level: z.string().optional(),
    environment: z.string().optional(),
  })

  const { city, age, size, environment, energy_level, independence_level } =
    searchPetsQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    age,
    size,
    environment,
    energy_level,
    independence_level,
  })

  return reply.send({ pets })
}
