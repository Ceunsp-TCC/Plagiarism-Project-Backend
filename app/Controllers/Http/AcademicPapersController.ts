import SendAcademicPaperService from 'App/Services/AcademicPaperServices/SendAcademicPaperService'
import SendAcademicPaperValidator from 'App/Validators/SendAcademicPaperValidator'
import GetAllAcademicPapersByActivityService from 'App/Services/AcademicPaperServices/GetAllAcademicPapersByActivityService'
import GetAcademicPaperByIdService from 'App/Services/AcademicPaperServices/GetAcademicPaperByIdService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class AcademicPapersController {
  private sendAcademicPaperService: SendAcademicPaperService
  private getAllAcademicPapersByActivityService: GetAllAcademicPapersByActivityService
  private getAcademicPaperByIdService: GetAcademicPaperByIdService

  constructor() {
    this.sendAcademicPaperService = new SendAcademicPaperService()
    this.getAllAcademicPapersByActivityService = new GetAllAcademicPapersByActivityService()
    this.getAcademicPaperByIdService = new GetAcademicPaperByIdService()
  }
  public async store({ request, params, auth }: HttpContextContract) {
    const payload = await request.validate(SendAcademicPaperValidator)
    const activityId = Number(params.activityId)
    const studentId = await (await auth.user?.related('student').query().first())?.id!

    return await this.sendAcademicPaperService.create({ activityId, studentId, ...payload })
  }

  public async index({ request, params }: HttpContextContract) {
    const activityId = Number(params.activityId)

    const numberlinesPerPage = await request.input('numberlinesPerPage')
    const currentPage = await request.input('currentPage')

    return await this.getAllAcademicPapersByActivityService.getAll(
      activityId,
      currentPage,
      numberlinesPerPage
    )
  }

  public async show({ params }: HttpContextContract) {
    const academicPaperId = Number(params.academicPaperId)

    return await this.getAcademicPaperByIdService.getById(academicPaperId)
  }
}
