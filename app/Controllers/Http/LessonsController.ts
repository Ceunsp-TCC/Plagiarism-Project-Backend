import CreateLessonService from 'App/Services/LessonServices/CreateLessonService'
import CreateUpdateLessonValidator from 'App/Validators/CreateUpdateLessonValidator'
import GetLessonsByTeacherService from 'App/Services/LessonServices/GetLessonsByTeacherService'
import GetLessonsByStudentService from 'App/Services/LessonServices/GetLessonsByStudentService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LessonsController {
  private createLessonService: CreateLessonService
  private getLessonsByTeacherService: GetLessonsByTeacherService
  private getLessonsByStudentService: GetLessonsByStudentService

  constructor() {
    this.createLessonService = new CreateLessonService()
    this.getLessonsByTeacherService = new GetLessonsByTeacherService()
    this.getLessonsByStudentService = new GetLessonsByStudentService()
  }

  public async store({ request, params }: HttpContextContract) {
    const payload = await request.validate(CreateUpdateLessonValidator)
    const semesterId = params.semesterId as number

    return await this.createLessonService.create({ ...payload, semesterId })
  }

  public async getLessonsByTeacher({ auth, request }: HttpContextContract) {
    const teacherId = await (await auth.user?.related('teacher').query().first())?.id!

    const numberlinesPerPage = await request.input('numberlinesPerPage')
    const currentPage = await request.input('currentPage')

    return await this.getLessonsByTeacherService.getLessons({
      currentPage,
      teacherId,
      numberlinesPerPage,
    })
  }

  public async getLessonsByStudent({ auth, request }: HttpContextContract) {
    const studentId = await (await auth.user?.related('student').query().first())!.id

    const numberlinesPerPage = await request.input('numberlinesPerPage')
    const currentPage = await request.input('currentPage')

    return await this.getLessonsByStudentService.getLessons({
      currentPage,
      studentId,
      numberlinesPerPage,
    })
  }
}
