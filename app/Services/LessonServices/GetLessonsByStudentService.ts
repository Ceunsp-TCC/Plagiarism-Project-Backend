import DefaultResponse from '@ioc:Utils/DefaultResponse'
import StudentRepository from '@ioc:Repositories/StudentRepository'
import CustomException from 'App/Exceptions/CustomException'
import type { GetLessonsByStudentServiceDto } from 'App/Dtos/Services/Lessons/GetLessonsByStudentServiceDto'

export default class GetLessonsByStudentService {
  public async getLessons({
    currentPage = 1,
    studentId,
    numberlinesPerPage = 5,
  }: GetLessonsByStudentServiceDto) {
    const lessons = await StudentRepository.getLessons(studentId, currentPage, numberlinesPerPage)

    const isEmptyList = lessons.items.length === 0

    if (isEmptyList) {
      throw new CustomException('Lessons not found', 404)
    }
    return await DefaultResponse.successWithContent('Lessons found', 200, lessons)
  }
}
