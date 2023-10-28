import DefaultResponse from '@ioc:Utils/DefaultResponse'
import CustomException from 'App/Exceptions/CustomException'
import OrtographyCorrectionsRepository from '@ioc:Repositories/OrtographyCorrectionRepository'

export default class GetCorrectionByIdService {
  public async getById(id: number) {
    const correction = await OrtographyCorrectionsRepository.getById(id)

    if (!correction) {
      throw new CustomException('Correction not found', 404)
    }

    return await DefaultResponse.successWithContent('Corrections found', 200, correction)
  }
}
