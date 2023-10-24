import DefaultResponse from '@ioc:Utils/DefaultResponse'
import AcademicPaperRepository from '@ioc:Repositories/AcademicPaperRepository'
import CustomException from 'App/Exceptions/CustomException'
import BullMQ from '@ioc:Adonis/Addons/BullMQ'
import { AnalysisStatus } from 'App/Dtos/AcademicPapers/AcademicPaperDto'
import { QueueNamesEnum, PlagiarismAnalyseAcademicPaperQueueProps } from 'Contracts/queue'

const queue = BullMQ.queue<
  PlagiarismAnalyseAcademicPaperQueueProps,
  PlagiarismAnalyseAcademicPaperQueueProps
>(QueueNamesEnum.ANALYSE_ACADEMIC_PAPER)

export default class PlagiarismAnalyseService {
  public async send(academicPaperId: number, requesterId: number) {
    try {
      const findAcademicPaper = await AcademicPaperRepository.getById(academicPaperId)

      if (!findAcademicPaper) {
        throw new CustomException(`Not found academic paper`, 404)
      }
      await queue.add('analyse-plagiarism-job', { academicPaperId, requesterId })

      await AcademicPaperRepository.updateAnalyseStatus(academicPaperId, AnalysisStatus.PROCESSING)

      return await DefaultResponse.success('Analysis request made successfully', 200)
    } catch (error) {
      throw new CustomException(`An error has occurred ${error}`, 500)
    }
  }
}
