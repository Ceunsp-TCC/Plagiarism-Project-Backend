import DefaultResponse from '@ioc:Utils/DefaultResponse'
import SemesterRepository from '@ioc:Repositories/SemesterRepository'
import CourseRepository from '@ioc:Repositories/CourseRepository'
import type { SemesterDto } from 'App/Dtos/Semesters/SemesterDto'
import CustomException from 'App/Exceptions/CustomException'

export default class CreateSemesterService {
  public async create({ courseId, name, description }: SemesterDto) {
    const course = await CourseRepository.findById(courseId)

    if (!course) {
      throw new CustomException('Course not found', 404)
    }

    const semester = {
      courseId,
      name,
      description,
    }

    await SemesterRepository.create(semester)

    return await DefaultResponse.success('Semester created successfully', 201)
  }
}
