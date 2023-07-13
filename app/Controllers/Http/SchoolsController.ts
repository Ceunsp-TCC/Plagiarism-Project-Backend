import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateSchoolService from 'App/Services/SchoolsServices/CreateSchoolService'
import ValidDocumentService from 'App/Services/SchoolsServices/ValidDocumentService'
import UpdateStatusSchoolService from 'App/Services/SchoolsServices/UpdateStatusSchoolService'
import CreateSchoolValidator from 'App/Validators/CreateSchoolValidator'
import ValidSchoolDocumentValidator from 'App/Validators/ValidSchoolDocumentValidator'
import UpdateSchoolStatusValidator from 'App/Validators/UpdateSchoolStatusValidator'

export default class SchoolsController {
  private createSchoolService: CreateSchoolService
  private validDocumentService: ValidDocumentService
  private updateStatusSchoolService: UpdateStatusSchoolService

  constructor() {
    ;(this.createSchoolService = new CreateSchoolService()),
      (this.validDocumentService = new ValidDocumentService()),
      (this.updateStatusSchoolService = new UpdateStatusSchoolService())
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateSchoolValidator)

    return await this.createSchoolService.create(payload)
  }

  public async validDocument({ request }: HttpContextContract) {
    const payload = await request.validate(ValidSchoolDocumentValidator)

    return await this.validDocumentService.validDocument(payload.document)
  }

  public async updateStatus({ request }: HttpContextContract) {
    const payload = await request.validate(UpdateSchoolStatusValidator)
    const userId = await request.param('id')

    return await this.updateStatusSchoolService.updateStatus(payload.status as any, userId)
  }
}
