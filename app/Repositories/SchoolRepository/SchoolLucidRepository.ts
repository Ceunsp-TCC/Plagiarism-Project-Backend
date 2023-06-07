import type SchoolRepositoryInterface from 'App/Interfaces/Repositories/SchoolRepositoryInterface'
import Schools from 'App/Models/Schools'
import type { SchoolDto, SchoolAddressDto } from 'App/Dtos/Schools/SchoolDto'

export default class SchoolLucidRepository implements SchoolRepositoryInterface {
  constructor(private readonly model: typeof Schools) {
    this.model = model
  }
  public async create(school: SchoolDto, schoolAddress: SchoolAddressDto): Promise<boolean> {
    const create = await this.model.create(school)

    await create.related('address').create(schoolAddress)

    return true
  }
  public async findByEmail(email: string): Promise<Schools | null> {
    return await this.model.findBy('email', email)
  }
}
