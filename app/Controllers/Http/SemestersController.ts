import CreateSemesterService from 'App/Services/SemesterServices/CreateSemesterService'
import CreateUpdateSemesterValidator from 'App/Validators/CreateUpdateSemesterValidator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SemestersController {
  private createSemesterService: CreateSemesterService

  constructor() {
    this.createSemesterService = new CreateSemesterService()
  }

  public async store({ request, params }: HttpContextContract) {
    const payload = await request.validate(CreateUpdateSemesterValidator)
    const courseId = params.courseId as number

    return await this.createSemesterService.create({ ...payload, courseId })
  }
}
