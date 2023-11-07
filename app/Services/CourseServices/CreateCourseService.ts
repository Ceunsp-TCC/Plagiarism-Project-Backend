import DefaultResponse from '@ioc:Utils/DefaultResponse'
import CourseRepository from '@ioc:Repositories/CourseRepository'
import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import CustomException from 'App/Exceptions/CustomException'
import type { CourseServiceDto } from 'App/Dtos/Courses/CourseDto'

export default class CreateCourseService {
  public async create({
    name,
    description,
    modality,
    price,
    schoolId,
    category,
    image,
  }: CourseServiceDto) {
    const findBySameName = await CourseRepository.findByNameAndSchoolId(name, schoolId)

    if (findBySameName) {
      throw new CustomException('Your school have a course with same name', 400)
    }
    const nameImage = `${name.replace(/\s/g, '')}${cuid()}.${image.extname}`

    await image.move(Application.tmpPath('/uploads/courses'), {
      name: nameImage,
    })
    const urlImage = `${Env.get('APP_URL')}/uploads/courses/${nameImage}`

    const course = {
      name,
      description,
      modality,
      price,
      schoolId,
      category,
      image: urlImage,
    }

    await CourseRepository.create(course)

    return await DefaultResponse.success('Course created successfully', 201)
  }
}
