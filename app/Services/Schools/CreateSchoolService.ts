import DefaultResponse from 'App/Utils/DefaultResponse'
import SchoolLucidRepository from 'App/Repositories/SchoolRepository/SchoolLucidRepository'
import SchoolAddress from 'App/Models/SchoolAddress'
import Schools from 'App/Models/Schools'

export default class CreateSchoolService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly schoolRepository: SchoolLucidRepository
  ) {
    this.schoolRepository = schoolRepository
    this.defaultResponse = defaultResponse
  }

  public async create(school: Schools, schoolAddress: SchoolAddress) {
    await this.schoolRepository.create(school, schoolAddress)
    return await this.defaultResponse.success('School created successfully', 201)
  }
}
