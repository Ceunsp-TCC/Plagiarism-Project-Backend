import CreateActivityService from 'App/Services/ActivityServices/CreateActivityService'
import GetAllActivitiesService from 'App/Services/ActivityServices/GetAllActivitiesService'
import CreateUpdateActivityValidator from 'App/Validators/CreateUpdateActivityValidator'
import GetActivityByIdService from 'App/Services/ActivityServices/GetActivityByIdService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ActivitiesController {
  private createActivityService: CreateActivityService
  private getAllActivitiesService: GetAllActivitiesService
  private getActivityByIdService: GetActivityByIdService

  constructor() {
    this.createActivityService = new CreateActivityService()
    this.getAllActivitiesService = new GetAllActivitiesService()
    this.getActivityByIdService = new GetActivityByIdService()
  }
  public async store({ request, params }: HttpContextContract) {
    const payload = await request.validate(CreateUpdateActivityValidator)
    const lessonId = Number(params.lessonId)

    return await this.createActivityService.create({ ...payload, lessonId })
  }

  public async index({ params }: HttpContextContract) {
    const lessonId = Number(params.lessonId)

    return await this.getAllActivitiesService.getAll(lessonId)
  }

  public async show({ params }: HttpContextContract) {
    const activityId = Number(params.activityId)

    return await this.getActivityByIdService.getById(activityId)
  }
}
