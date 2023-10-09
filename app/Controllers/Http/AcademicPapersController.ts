import SendAcademicPaperService from 'App/Services/AcademicPaperServices/SendAcademicPaperService'
import SendAcademicPaperValidator from 'App/Validators/SendAcademicPaperValidator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class AcademicPapersController {
  private sendAcademicPaperService: SendAcademicPaperService

  constructor() {
    this.sendAcademicPaperService = new SendAcademicPaperService()
  }
  public async store({ request, params, auth }: HttpContextContract) {
    const payload = await request.validate(SendAcademicPaperValidator)
    const activityId = Number(params.activityId)
    const studentId = await (await auth.user?.related('student').query().first())?.id!

    return await this.sendAcademicPaperService.create({ activityId, studentId, ...payload })
  }
}
