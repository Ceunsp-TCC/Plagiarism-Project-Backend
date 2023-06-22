import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateSchoolService from 'App/Services/SchoolsServices/CreateSchoolService'
import ValidDocumentService from 'App/Services/SchoolsServices/ValidDocumentService'
import CreateSchoolValidator from 'App/Validators/CreateSchoolValidator'
import ValidSchoolDocumentValidator from 'App/Validators/ValidSchoolDocumentValidator'
import DefaultResponse from 'App/Utils/DefaultResponse'
import UserLucidRepository from 'App/Repositories/UserRepository/UserLucidRepository'
import RoleLucidRepository from 'App/Repositories/RoleRepository/RoleLucidRepository'
import ViaCepServices from 'App/Services/Http/ViaCepServices/ViaCepServices'
import Roles from 'App/Models/Roles'
import Users from 'App/Models/Users'
export default class SchoolsController {
  private createSchoolService: CreateSchoolService
  private validDocumentService: ValidDocumentService
  constructor() {
    ;(this.createSchoolService = new CreateSchoolService(
      new DefaultResponse(),
      new UserLucidRepository(Users),
      new RoleLucidRepository(Roles),
      new ViaCepServices()
    )),
      (this.validDocumentService = new ValidDocumentService(
        new DefaultResponse(),
        new UserLucidRepository(Users)
      ))
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateSchoolValidator)

    return await this.createSchoolService.create(payload)
  }

  public async validDocument({ request }: HttpContextContract) {
    const payload = await request.validate(ValidSchoolDocumentValidator)

    return await this.validDocumentService.validDocument(payload.document)
  }
}
