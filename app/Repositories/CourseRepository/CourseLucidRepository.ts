import Courses from 'App/Models/Courses'
import DefaultPaginate from '@ioc:Utils/DefaultPaginate'
import type { CourseRepositoryDto, CourseDtoResponse } from 'App/Dtos/Courses/CourseDto'
import type CourseRepositoryInterface from 'App/Interfaces/Repositories/CourseRepositoryInterface'
import type { SimplePaginatorContract } from '@ioc:Adonis/Lucid/Database'

export default class CourseLucidRepository implements CourseRepositoryInterface {
  constructor(private readonly model: typeof Courses) {}

  public async create(courseData: CourseRepositoryDto) {
    const course = await this.model.create(courseData)

    return course
  }

  public async getAll(
    schoolId: number,
    currentPage: number = 1,
    numberlinesPerPage: number = 5,
    name: string = ''
  ) {
    const courses = await this.model
      .query()
      .withScopes((scopes) => scopes.byUser(schoolId))
      .where((query) => {
        if (name) {
          query.whereILike('name', `%${name}%`)
        }
      })
      .orderBy('createdAt', 'desc')
      .paginate(currentPage!, numberlinesPerPage)

    return DefaultPaginate.formatToDefaultPaginate<CourseDtoResponse>({
      items: (await courses.all()) as unknown as CourseDtoResponse[],
      paginateProperties: courses as unknown as SimplePaginatorContract<CourseDtoResponse>,
    })
  }

  public async findById(courseId: number): Promise<Courses | null> {
    const course = await this.model
      .query()
      .where('id', courseId)
      .preload('semesters', (builder) => builder.preload('lessons'))
      .first()

    return course
  }
  public async findByNameAndSchoolId(name: string, schoolId: number): Promise<Courses | null> {
    const course = await this.model.query().where('name', name).where('schoolId', schoolId).first()

    return course
  }
}
