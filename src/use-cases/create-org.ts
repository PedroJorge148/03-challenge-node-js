import { OrgsRepository } from '@/repositories/orgs-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface CreateOrgUseCaseRequest {
  name?: string
  owner: string
  email: string
  password: string
  phone: string
  number: string
  address: string
  city: string
  state: string
  zipcode: string
}

interface CreateOrgUseCaseResponse {
  org: Organization
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    props: CreateOrgUseCaseRequest,
  ): Promise<CreateOrgUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(props.email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(props.password, 6)

    const org = await this.orgsRepository.create({
      password_hash,
      ...props,
    })

    return {
      org,
    }
  }
}
