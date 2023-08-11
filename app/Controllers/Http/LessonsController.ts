import CreateLessonService from 'App/Services/LessonServices/CreateLessonService'
import CreateUpdateLessonValidator from 'App/Validators/CreateUpdateLessonValidator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LessonsController {
  private createLessonService: CreateLessonService

  constructor() {
    this.createLessonService = new CreateLessonService()
  }
  public async index({}: HttpContextContract) {}

  public async store({ request, params }: HttpContextContract) {
    const payload = await request.validate(CreateUpdateLessonValidator)
    const semesterId = params.semesterId as number

    return await this.createLessonService.create({ ...payload, semesterId })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
