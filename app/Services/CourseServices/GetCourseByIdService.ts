import DefaultResponse from '@ioc:Utils/DefaultResponse'
import CourseRepository from '@ioc:Repositories/CourseRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class GetCourseByIdService {
  public async getById(courseId: number) {
    const course = await CourseRepository.findById(courseId)

    if (!course) {
      throw new CustomException('Course not found', 404)
    }

    return await DefaultResponse.successWithContent('Course found', 200, course)
  }
}
