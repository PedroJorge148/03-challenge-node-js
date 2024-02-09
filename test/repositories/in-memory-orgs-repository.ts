import { OrgsRepository } from '@/repositories/orgs-repository'
import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name ?? '',
      owner: data.owner,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
      number: data.number,
      address: data.address,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
