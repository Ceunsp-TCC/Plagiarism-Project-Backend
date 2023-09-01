import Classes from 'App/Models/Classes'
import Database from '@ioc:Adonis/Lucid/Database'
import CustomException from 'App/Exceptions/CustomException'
import DefaultPaginate from '@ioc:Utils/DefaultPaginate'
import type { ClassRepositoryDto, ClassDtoResponse } from 'App/Dtos/Class/ClassDto'
import type ClassRepositoryInterface from 'App/Interfaces/Repositories/ClassRepositoryInterface'
import type { SimplePaginatorContract } from '@ioc:Adonis/Lucid/Database'

export default class ClassLucidRepository implements ClassRepositoryInterface {
  constructor(private readonly model: typeof Classes) {}

  public async create({ name, courseId, schoolId, semesters }: ClassRepositoryDto) {
    const trx = await Database.transaction()

    try {
      const createClass = await trx
        .insertQuery()
        .table('classes')
        .insert({ courseId, schoolId, name })
        .returning('id')
      const classId = createClass[0].id

      for (const semester of semesters) {
        const createSemester = await trx
          .insertQuery()
          .table('classSemesters')
          .insert({ classId, name: semester.name, description: semester.description })
          .returning('id')
        const classSemesterId = createSemester[0].id

        const lessons = semester.lessons.map((semester) => ({
          classSemesterId,
          name: semester.name,
          description: semester.description,
          place: semester.place,
        }))

        //@ts-ignore
        const createLessons = await trx
          .insertQuery()
          .table('classSemestersLessons')
          .multiInsert(lessons)
      }
      await trx.commit()
      return createClass
    } catch (error) {
      await trx.rollback()
      throw new CustomException(error.message, 500)
    }
  }
  public async getAll(
    schoolId: number,
    currentPage: number = 1,
    numberlinesPerPage: number = 5,
    name: string = ''
  ) {
    const classes = await this.model
      .query()
      .withScopes((scopes) => scopes.byUser(schoolId))
      .where((query) => {
        if (name) {
          query.whereILike('name', `%${name}%`)
        }
      })
      .orderBy('createdAt', 'desc')
      .paginate(currentPage!, numberlinesPerPage)

    return DefaultPaginate.formatToDefaultPaginate<ClassDtoResponse>({
      items: (await classes.all()) as unknown as ClassDtoResponse[],
      paginateProperties: classes as unknown as SimplePaginatorContract<ClassDtoResponse>,
    })
  }
}
