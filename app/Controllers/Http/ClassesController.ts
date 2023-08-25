import CreateClassService from 'App/Services/ClassServices/CreateClassService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClassesController {
  public createClassService: CreateClassService

  constructor() {
    this.createClassService = new CreateClassService()
  }

  public async store({ auth, params }: HttpContextContract) {
    const schoolId = await auth.user?.id!
    const courseId = params.courseId as number

    return await this.createClassService.create({ courseId, schoolId })
  }
}
