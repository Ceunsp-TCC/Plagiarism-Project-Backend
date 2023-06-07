import DefaultResponse from 'App/Utils/DefaultResponse'
import SchoolLucidRepository from 'App/Repositories/SchoolRepository/SchoolLucidRepository'
import type { SchoolDto, SchoolAddressDto } from 'App/Dtos/Schools/SchoolDto'
export default class CreateSchoolService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly schoolRepository: SchoolLucidRepository
  ) {
    this.schoolRepository = schoolRepository
    this.defaultResponse = defaultResponse
  }

  public async create(school: SchoolDto, schoolAddress: SchoolAddressDto) {
    await this.schoolRepository.create(school, schoolAddress)
    return await this.defaultResponse.success('School created successfully', 201)
  }
}
