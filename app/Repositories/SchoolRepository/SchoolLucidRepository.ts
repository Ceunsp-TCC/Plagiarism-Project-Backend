import SchoolAddress from 'App/Models/SchoolAddress'
import type SchoolRepositoryInterface from 'App/Interfaces/Repositories/SchoolRepositoryInterface'
import Schools from 'App/Models/Schools'

class SchoolLucidRepository implements SchoolRepositoryInterface {
  constructor(private readonly model: typeof Schools) {}
  public async create(school: Schools, schoolAddress: SchoolAddress): Promise<Schools> {
    const create = await this.model.create(school)

    await create.related('address').create(schoolAddress)

    return create
  }
}

export default new SchoolLucidRepository(Schools)
