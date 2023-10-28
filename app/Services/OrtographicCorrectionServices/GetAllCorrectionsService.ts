import DefaultResponse from '@ioc:Utils/DefaultResponse'
import CustomException from 'App/Exceptions/CustomException'
import OrtographyCorrectionsRepository from '@ioc:Repositories/OrtographyCorrectionRepository'

export default class GetAllCorrectionsService {
  public async getAll(
    requesterId: number,
    currentPage?: number,
    numberlinesPerPage?: number,
    identifier?: string
  ) {
    const corrections = await OrtographyCorrectionsRepository.getAll(
      requesterId,
      currentPage,
      numberlinesPerPage,
      identifier
    )
    const isEmptyList = corrections.items.length === 0

    if (isEmptyList) {
      throw new CustomException('Corrections not found', 404)
    }

    return await DefaultResponse.successWithContent('Corrections found', 200, corrections)
  }
}
