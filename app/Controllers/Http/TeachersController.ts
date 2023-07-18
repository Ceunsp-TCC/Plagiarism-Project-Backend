import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateTeacherService from 'App/Services/TeacherServices/CreateTeacherService'
import CreateUpdateTeacherValidator from 'App/Validators/CreateUpdateTeacherValidator'

export default class TeachersController {
  private createTeacherService: CreateTeacherService

  constructor() {
    this.createTeacherService = new CreateTeacherService()
  }

  public async store({ auth, request }: HttpContextContract) {
    const payload = await request.validate(CreateUpdateTeacherValidator)
    const schoolId = await auth.user?.id!

    return await this.createTeacherService.create({ ...payload, schoolId })
  }
}
