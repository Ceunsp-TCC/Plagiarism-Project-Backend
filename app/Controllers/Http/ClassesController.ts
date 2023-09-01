import CreateClassService from 'App/Services/ClassServices/CreateClassService'
import GetAllClassesService from 'App/Services/ClassServices/GetAllClassesService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClassesController {
  public createClassService: CreateClassService
  public getAllClassesService: GetAllClassesService

  constructor() {
    this.createClassService = new CreateClassService()
    this.getAllClassesService = new GetAllClassesService()
  }

  public async store({ auth, params }: HttpContextContract) {
    const schoolId = await (await auth.user?.related('school').query().first())?.id!
    const courseId = params.courseId as number

    return await this.createClassService.create({ courseId, schoolId })
  }

  public async index({ auth, request }: HttpContextContract) {
    const schoolId = await (await auth.user?.related('school').query().first())?.id!

    const numberlinesPerPage = await request.input('numberlinesPerPage')
    const currentPage = await request.input('currentPage')
    const name = await request.input('name')

    return await this.getAllClassesService.getAll(schoolId, currentPage, numberlinesPerPage, name)
  }
}
