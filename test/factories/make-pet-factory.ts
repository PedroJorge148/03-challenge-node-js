import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export function makePet(
  override: Partial<Prisma.PetUncheckedCreateInput> = {},
): Prisma.PetUncheckedCreateInput {
  return {
    id: randomUUID(),
    name: faker.animal.dog(),
    description: faker.lorem.paragraph(),
    species: faker.animal.type(),
    age: faker.number.int({ min: 0, max: 12 }).toString(),
    size: faker.helpers.arrayElement(['small', 'medium', 'large']),
    energy_level: faker.helpers.arrayElement(['low', 'medium', 'high']),
    environment: faker.helpers.arrayElement(['indoor', 'outdoor']),
    independence_level: faker.helpers.arrayElement(['low', 'medium', 'high']),
    org_id: 'example-org-id',
    ...override,
  }
}
