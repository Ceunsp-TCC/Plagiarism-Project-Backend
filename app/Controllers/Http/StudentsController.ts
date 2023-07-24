import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateStudentService from 'App/Services/StudentsServices/CreateStudentService'
import GetAllStudentsService from 'App/Services/StudentsServices/GetAllStudentsService'
import CreateUpdateStudentValidator from 'App/Validators/CreateUpdateStudentValidator'

export default class StudentsController {
  private createStudentService: CreateStudentService
  private getAllStudentsService: GetAllStudentsService

  constructor() {
    this.createStudentService = new CreateStudentService()
    this.getAllStudentsService = new GetAllStudentsService()
  }

  public async store({ auth, request }: HttpContextContract) {
    const payload = await request.validate(CreateUpdateStudentValidator)
    const schoolId = await auth.user?.id!

    return await this.createStudentService.create({ ...payload, schoolId })
  }
  public async index({ auth, request }: HttpContextContract) {
    const schoolId = await auth.user?.id!

    const numberlinesPerPage = await request.input('numberlinesPerPage')
    const currentPage = await request.input('currentPage')
    const name = await request.input('name')

    return await this.getAllStudentsService.getAll(schoolId, currentPage, numberlinesPerPage, name)
  }
}
