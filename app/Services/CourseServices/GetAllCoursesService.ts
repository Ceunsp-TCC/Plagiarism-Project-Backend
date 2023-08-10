import DefaultResponse from '@ioc:Utils/DefaultResponse'
import CourseRepository from '@ioc:Repositories/CourseRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class GetAllCoursesService {
  public async getAll(
    schoolId: number,
    currentPage?: number,
    numberlinesPerPage?: number,
    name?: string
  ) {
    const courses = await CourseRepository.getAll(schoolId, currentPage, numberlinesPerPage, name)

    const isEmptyList = courses.items.length === 0

    if (isEmptyList) {
      throw new CustomException('Courses not found', 404)
    }
    return await DefaultResponse.successWithContent('Courses found', 200, courses)
  }
}
