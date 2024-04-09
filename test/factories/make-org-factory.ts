import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export function makeOrg(
  override: Partial<Prisma.OrganizationUncheckedCreateInput> = {},
): Prisma.OrganizationUncheckedCreateInput {
  return {
    id: randomUUID(),
    name: faker.company.name(),
    owner: faker.person.fullName(),
    email: faker.internet.email(),
    password_hash: faker.internet.password(),
    phone: faker.phone.number(),

    number: faker.number.int({ min: 1, max: 1000 }).toString(),
    city: faker.location.city(),
    address: faker.location.street(),
    state: faker.location.state(),
    zipcode: faker.location.zipCode(),
    ...override,
  }
}
