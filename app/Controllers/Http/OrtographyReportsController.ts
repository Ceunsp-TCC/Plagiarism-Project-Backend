import CreateNewCorrectionService from 'App/Services/OrtographicCorrectionServices/CreateNewCorrectionService'
import CreateNewCorrectionValidator from 'App/Validators/CreateNewCorrectionValidator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrtographyReportsController {
  public createNewCorrectionService: CreateNewCorrectionService

  constructor() {
    this.createNewCorrectionService = new CreateNewCorrectionService()
  }

  public async store({ request, auth }: HttpContextContract) {
    const payload = await request.validate(CreateNewCorrectionValidator)
    const requesterId = await auth.user!.id

    return await this.createNewCorrectionService.create({ ...payload, requesterId })
  }
}
