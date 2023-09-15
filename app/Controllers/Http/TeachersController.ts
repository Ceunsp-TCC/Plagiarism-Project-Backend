import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateTeacherService from 'App/Services/TeacherServices/CreateTeacherService'
import GetAllTeacherService from 'App/Services/TeacherServices/GetAllTeacherService'
import CreateUpdateTeacherValidator from 'App/Validators/CreateUpdateTeacherValidator'

export default class TeachersController {
  private createTeacherService: CreateTeacherService
  private getAllTeacherService: GetAllTeacherService

  constructor() {
    this.createTeacherService = new CreateTeacherService()
    this.getAllTeacherService = new GetAllTeacherService()
  }

  public async store({ auth, request }: HttpContextContract) {
    const payload = await request.validate(CreateUpdateTeacherValidator)
    const schoolId = await (await auth.user?.related('school').query().first())?.id!
    return await this.createTeacherService.create({ ...payload, schoolId })
  }

  public async index({ auth, request }: HttpContextContract) {
    const schoolId = await (await auth.user?.related('school').query().first())?.id!

    const numberlinesPerPage = await request.input('numberlinesPerPage')
    const currentPage = await request.input('currentPage')
    const name = await request.input('name')

    return await this.getAllTeacherService.getAll(schoolId, currentPage, numberlinesPerPage, name)
  }
}
