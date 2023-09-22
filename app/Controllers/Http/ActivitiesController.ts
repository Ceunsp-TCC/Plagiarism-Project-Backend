import CreateActivityService from 'App/Services/ActivityServices/CreateActivityService'
import CreateUpdateActivityValidator from 'App/Validators/CreateUpdateActivityValidator'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ActivitiesController {
  private createActivityService: CreateActivityService

  constructor() {
    this.createActivityService = new CreateActivityService()
  }
  public async store({ request, params }: HttpContextContract) {
    const payload = await request.validate(CreateUpdateActivityValidator)
    const lessonId = Number(params.lessonId)

    return await this.createActivityService.create({ ...payload, lessonId })
  }
}
