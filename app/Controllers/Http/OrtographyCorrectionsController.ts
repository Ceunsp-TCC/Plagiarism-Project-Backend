import CreateNewCorrectionService from 'App/Services/OrtographicCorrectionServices/CreateNewCorrectionService'
import GetAllCorrectionsService from 'App/Services/OrtographicCorrectionServices/GetAllCorrectionsService'
import CreateNewCorrectionValidator from 'App/Validators/CreateNewCorrectionValidator'
import GetCorrectionByIdService from 'App/Services/OrtographicCorrectionServices/GetCorrectionByIdService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrtographyCorrectionsController {
  public createNewCorrectionService: CreateNewCorrectionService
  public getAllCorrectionsService: GetAllCorrectionsService
  public getCorrectionByIdService: GetCorrectionByIdService

  constructor() {
    this.createNewCorrectionService = new CreateNewCorrectionService()
    this.getAllCorrectionsService = new GetAllCorrectionsService()
    this.getCorrectionByIdService = new GetCorrectionByIdService()
  }

  public async store({ request, auth }: HttpContextContract) {
    const payload = await request.validate(CreateNewCorrectionValidator)
    const requesterId = await auth.user!.id

    return await this.createNewCorrectionService.create({ ...payload, requesterId })
  }

  public async index({ request, auth }: HttpContextContract) {
    const requesterId = await auth.user!.id
    const numberlinesPerPage = await request.input('numberlinesPerPage')
    const currentPage = await request.input('currentPage')
    const identifier = await request.input('identifier')

    return await this.getAllCorrectionsService.getAll(
      requesterId,
      currentPage,
      numberlinesPerPage,
      identifier
    )
  }
  public async show({ params }: HttpContextContract) {
    const ortographyCorrectionId = Number(params.ortographyCorrectionId)

    return await this.getCorrectionByIdService.getById(ortographyCorrectionId)
  }
}
