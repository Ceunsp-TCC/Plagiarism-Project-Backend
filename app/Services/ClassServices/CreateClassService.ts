import DefaultResponse from '@ioc:Utils/DefaultResponse'
import ClassRepository from '@ioc:Repositories/ClassRepository'
import CourseRepository from '@ioc:Repositories/CourseRepository'
import CustomException from 'App/Exceptions/CustomException'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import { DateTime } from 'luxon'
import type { ClassServiceDto } from 'App/Dtos/Class/ClassDto'

export default class CreateClassService {
  public async create({ courseId, schoolId }: ClassServiceDto) {
    const course = await CourseRepository.findById(courseId)

    if (!course) {
      throw new CustomException('Course not found', 404)
    }

    const className = `${course.name}-${cuid()}-${DateTime.now().year}`

    const classBody = {
      courseId,
      schoolId,
      name: className,
    }

    await ClassRepository.create(classBody)

    return await DefaultResponse.success('Class created successfully', 201)
  }
}
