import CreateClassService from 'App/Services/ClassServices/CreateClassService'
import GetAllClassesService from 'App/Services/ClassServices/GetAllClassesService'
import GetClassByIdService from 'App/Services/ClassServices/GetClassByIdService'
import GetStudentsByClassService from 'App/Services/ClassServices/GetStudentsByClass'
import LinkTeacherAndLessonService from 'App/Services/ClassServices/LinkTeacherAndLessonService'
import LinkTeacherAndLessonValidator from 'App/Validators/LinkTeacherAndLessonValidator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClassesController {
  public createClassService: CreateClassService
  public getAllClassesService: GetAllClassesService
  public getClassByIdService: GetClassByIdService
  public getStudentsByClassService: GetStudentsByClassService
  public linkTeacherAndLessonService: LinkTeacherAndLessonService
  constructor() {
    this.createClassService = new CreateClassService()
    this.getAllClassesService = new GetAllClassesService()
    this.getClassByIdService = new GetClassByIdService()
    this.getStudentsByClassService = new GetStudentsByClassService()
    this.linkTeacherAndLessonService = new LinkTeacherAndLessonService()
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

  public async show({ params }: HttpContextContract) {
    const classId = Number(params.classId)

    return await this.getClassByIdService.getById(classId)
  }

  public async getStudents({ request, params }: HttpContextContract) {
    const classId = Number(params.classId)

    const numberlinesPerPage = await request.input('numberlinesPerPage')
    const currentPage = await request.input('currentPage')
    const name = await request.input('name')

    return await this.getStudentsByClassService.getStudents(
      classId,
      currentPage,
      numberlinesPerPage,
      name
    )
  }

  public async linkTeacherWithLesson({ request }: HttpContextContract) {
    const payload = await request.validate(LinkTeacherAndLessonValidator)

    return await this.linkTeacherAndLessonService.linkTeacherAndLesson(
      payload.lessonId,
      payload.teacherId
    )
  }
}
