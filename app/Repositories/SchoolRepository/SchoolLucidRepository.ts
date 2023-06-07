import SchoolAddress from 'App/Models/SchoolAddress'
import type SchoolRepositoryInterface from 'App/Interfaces/Repositories/SchoolRepositoryInterface'
import Schools from 'App/Models/Schools'

export default class SchoolLucidRepository implements SchoolRepositoryInterface {
  constructor(private readonly model: typeof Schools) {
    this.model = model
  }
  public async create(school: Schools, schoolAddress: SchoolAddress): Promise<Schools> {
    const create = await this.model.create(school)

    await create.related('address').create(schoolAddress)

    return create
  }
  public async findByEmail(email: string): Promise<Schools | null> {
    return await this.model.findBy('email', email)
  }
}
