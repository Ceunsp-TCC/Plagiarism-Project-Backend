import DefaultResponse from '@ioc:Utils/DefaultResponse'
import TeacherRepository from '@ioc:Repositories/TeacherRepository'
import CustomException from 'App/Exceptions/CustomException'
import type { GetLessonsByTeacherServiceDto } from 'App/Dtos/Services/Lessons/GetLessonsByTeacherServiceDto'

export default class GetLessonsByTeacherService {
  public async getLessons({
    currentPage = 1,
    teacherId,
    numberlinesPerPage = 5,
  }: GetLessonsByTeacherServiceDto) {
    const lessons = await TeacherRepository.getLessons(teacherId, currentPage, numberlinesPerPage)

    const isEmptyList = lessons.items.length === 0

    if (isEmptyList) {
      throw new CustomException('Lessons not found', 404)
    }
    return await DefaultResponse.successWithContent('Lessons found', 200, lessons)
  }
}
