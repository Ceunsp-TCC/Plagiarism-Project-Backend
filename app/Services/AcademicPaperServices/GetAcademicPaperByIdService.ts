import DefaultResponse from '@ioc:Utils/DefaultResponse'
import AcademicPaperRepository from '@ioc:Repositories/AcademicPaperRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class GetAcademicPaperByIdService {
  public async getById(academicPaperId: number) {
    const academicPaper = await AcademicPaperRepository.getById(academicPaperId)

    if (!academicPaper) {
      throw new CustomException('Academic paper not found', 404)
    }

    return await DefaultResponse.successWithContent('Academic paper found', 200, academicPaper)
  }
}
