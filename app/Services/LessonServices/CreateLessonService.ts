import DefaultResponse from '@ioc:Utils/DefaultResponse'
import SemesterRepository from '@ioc:Repositories/SemesterRepository'
import LessonRepository from '@ioc:Repositories/LessonRepository'
import CustomException from 'App/Exceptions/CustomException'
import type { LessonDto } from 'App/Dtos/Lessons/LessonDto'

export default class CreateLessonService {
  public async create({ semesterId = 0, name = '', description = '', place = '' }: LessonDto) {
    const semester = await SemesterRepository.findById(semesterId)

    if (!semester) {
      throw new CustomException('Semester not found', 404)
    }

    const lesson = {
      semesterId,
      name,
      description,
      place,
    }

    await LessonRepository.create(lesson)

    return await DefaultResponse.success('Lesson created successfully', 201)
  }
}
