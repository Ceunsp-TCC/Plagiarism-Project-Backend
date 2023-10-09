import DefaultResponse from '@ioc:Utils/DefaultResponse'
import AcademicPaperRepository from '@ioc:Repositories/AcademicPaperRepository'
import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import ActivityRepository from '@ioc:Repositories/ActivityRepository'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import CustomException from 'App/Exceptions/CustomException'
import PDF from '@ioc:Libraries/PDF'
import type { SendAcademicPaperServiceDto } from 'App/Dtos/Services/AcademicPaperServices/SendAcademicPaperServiceDto'

export default class SendAcademicPaperService {
  public async create({
    activityId = 0,
    studentId = 0,
    paper,
    comments = '',
  }: SendAcademicPaperServiceDto) {
    const activity = await ActivityRepository.findById(activityId)

    if (!activity) {
      throw new CustomException('Activity not found', 404)
    }
    const namePaper = `${studentId}${cuid()}.${paper.extname}`

    await paper.move(Application.tmpPath('/uploads/academic-papers'), {
      name: namePaper,
    })

    const urlPaper = `${Env.get('APP_URL')}/uploads/academic-papers/${namePaper}`
    const numberWordsFromAcademicPaper = await PDF.countWords(urlPaper)

    const maxNumberWords = 100
    const maxWordsUltrapassed = numberWordsFromAcademicPaper > maxNumberWords

    if (maxWordsUltrapassed) {
      throw new CustomException(
        'The number of words in the PDF exceeds the limit of 100 words',
        400
      )
    }

    const academicPaper = {
      activityId,
      studentId,
      paper: urlPaper,
      comments,
    }
    await AcademicPaperRepository.create(academicPaper)

    return await DefaultResponse.success('Academic paper saved', 201)
  }
}
