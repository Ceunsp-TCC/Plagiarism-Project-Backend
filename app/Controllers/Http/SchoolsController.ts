import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SchoolAddress from 'App/Models/SchoolAddress'
import Schools from 'App/Models/Schools'
import CreateSchoolService from 'App/Services/Schools/CreateSchoolService'
import CreateSchoolValidator from 'App/Validators/CreateSchoolValidator'
import DefaultResponse from 'App/Utils/DefaultResponse'
import SchoolLucidRepository from 'App/Repositories/SchoolRepository/SchoolLucidRepository'

export default class SchoolsController {
  private createSchoolService: CreateSchoolService
  constructor() {
    this.createSchoolService = new CreateSchoolService(
      new DefaultResponse(),
      new SchoolLucidRepository(Schools)
    )
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateSchoolValidator)

    const company = {
      corporateName: payload.corporateName,
      CNPJ: payload.CNPJ,
      phoneNumber: payload.phoneNumber,
      email: payload.email,
      password: payload.password,
    }
    return await this.createSchoolService.create(
      company as Schools,
      payload.address as SchoolAddress
    )
  }
}
