import DefaultResponse from 'App/Utils/DefaultResponse'
import SchoolLucidRepository from 'App/Repositories/SchoolRepository/SchoolLucidRepository'
import SchoolAddress from 'App/Models/SchoolAddress'
import Schools from 'App/Models/Schools'

class CreateSchoolService {
  constructor(
    private readonly defaultResponse: typeof DefaultResponse,
    private schoolRepository: typeof SchoolLucidRepository
  ) {}

  public async create(school: Schools, schoolAddress: SchoolAddress) {
    await this.schoolRepository.create(school, schoolAddress)
    return await this.defaultResponse.success('School created successfully', 201)
  }
}

export default new CreateSchoolService(DefaultResponse, SchoolLucidRepository)
