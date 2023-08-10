import CreateCourseService from 'App/Services/CourseServices/CreateCourseService'
import GetAllCoursesService from 'App/Services/CourseServices/GetAllCoursesService'
import CreateUpdateCourseValidator from 'App/Validators/CreateUpdateCourseValidator'
import type { CourseServiceDto } from 'App/Dtos/Courses/CourseDto'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CoursesController {
  public createCourseService: CreateCourseService
  public getAllCoursesService: GetAllCoursesService

  constructor() {
    this.createCourseService = new CreateCourseService()
    this.getAllCoursesService = new GetAllCoursesService()
  }

  public async store({ request, auth }: HttpContextContract) {
    const payload = await request.validate(CreateUpdateCourseValidator)
    const schoolId = await auth.user?.id!

    return await this.createCourseService.create({ ...payload, schoolId } as CourseServiceDto)
  }

  public async index({ auth, request }: HttpContextContract) {
    const schoolId = await auth.user?.id!
    const numberlinesPerPage = await request.input('numberlinesPerPage')
    const currentPage = await request.input('currentPage')
    const name = await request.input('name')

    return await this.getAllCoursesService.getAll(schoolId, currentPage, numberlinesPerPage, name)
  }
}
