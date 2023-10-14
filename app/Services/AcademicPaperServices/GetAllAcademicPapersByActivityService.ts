import DefaultResponse from '@ioc:Utils/DefaultResponse'
import AcademicPaperRepository from '@ioc:Repositories/AcademicPaperRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class GetAllAcademicPapersByActivityService {
  public async getAll(
    activityId: number = 1,
    currentPage: number = 1,
    numberlinesPerPage: number = 5
  ) {
    const academicPapers = await AcademicPaperRepository.getAll(
      activityId,
      currentPage,
      numberlinesPerPage
    )
    const isEmptyList = academicPapers.items.length === 0

    if (isEmptyList) {
      throw new CustomException('Academic papers not found', 404)
    }
    return await DefaultResponse.successWithContent('Academic papers found', 200, academicPapers)
  }
}
