import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateSchoolService from 'App/Services/Schools/CreateSchoolService'
import CreateSchoolValidator from 'App/Validators/CreateSchoolValidator'
import DefaultResponse from 'App/Utils/DefaultResponse'
import UserLucidRepository from 'App/Repositories/UserRepository/UserLucidRepository'
import RoleLucidRepository from 'App/Repositories/RoleRepository/RoleLucidRepository'
import Roles from 'App/Models/Roles'
import Users from 'App/Models/Users'
export default class SchoolsController {
  private createSchoolService: CreateSchoolService
  constructor() {
    this.createSchoolService = new CreateSchoolService(
      new DefaultResponse(),
      new UserLucidRepository(Users),
      new RoleLucidRepository(Roles)
    )
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateSchoolValidator)

    return await this.createSchoolService.create(payload)
  }
}
