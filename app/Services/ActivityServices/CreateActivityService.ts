import DefaultResponse from '@ioc:Utils/DefaultResponse'
import ActivityRepository from '@ioc:Repositories/ActivityRepository'
import ClassRepository from '@ioc:Repositories/ClassRepository'
import CustomException from 'App/Exceptions/CustomException'
import type { CreateActivityServiceDto } from 'App/Dtos/Services/ActivityServices/CreateActivityServiceDto'

export default class CreateActivityService {
  public async create({ title = '', comments = '', type, lessonId }: CreateActivityServiceDto) {
    const lesson = await ClassRepository.getLessonById(lessonId)

    if (!lesson) {
      throw new CustomException('Lesson not found', 404)
    }
    const activity = {
      lessonId,
      title,
      comments,
      type,
    }

    await ActivityRepository.create(activity)

    return await DefaultResponse.success('Activity created successfully', 201)
  }
}
