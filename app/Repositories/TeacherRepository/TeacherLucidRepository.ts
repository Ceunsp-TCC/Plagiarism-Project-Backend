import Database from '@ioc:Adonis/Lucid/Database'
import DefaultPaginate from '@ioc:Utils/DefaultPaginate'
import FormatDate from '@ioc:Utils/FormatDate'
import ClassSemestersLessons from 'App/Models/ClassSemestersLessons'
import { DefaultPaginateDtoResponse } from 'App/Dtos/Utils/DefaultPaginateDto'
import type { TeacherDtoResponse } from 'App/Dtos/Teachers/TeacherDto'
import type { LessonByTeacherDto } from 'App/Dtos/Lessons/LessonByTeacherDto'
import type TeacherRepositoryInterface from 'App/Interfaces/Repositories/TeacherRepositoryInterface'
import type { SimplePaginatorContract } from '@ioc:Adonis/Lucid/Database'
export default class TeacherLucidRepository implements TeacherRepositoryInterface {
  constructor(private readonly modelLessons: typeof ClassSemestersLessons) {}

  public async getAll(
    schoolId: number,
    currentPage: number = 1,
    numberlinesPerPage: number = 5,
    name: string = ''
  ) {
    const teachers = await Database.from('teachers')
      .select(
        'users.id',
        'users.name',
        'users.phoneNumber',
        'users.email',
        'teachers.CPF as cpf',
        'teachers.status',
        'teachers.id as teacherId',
        'users.createdAt'
      )

      .join('users', 'users.id', '=', 'teachers.userId')
      .where('teachers.schoolId', schoolId)
      .where((query) => {
        if (name) {
          query.whereILike('users.name', `%${name}%`)
        }
      })
      .orderBy('users.createdAt', 'desc')
      .paginate(currentPage!, numberlinesPerPage)

    const items = (await teachers.all()) as TeacherDtoResponse[]

    const serializeItems = items.map((teacher) => ({
      id: teacher.id,
      name: teacher.name,
      phoneNumber: teacher.phoneNumber,
      email: teacher.email,
      cpf: teacher.cpf,
      status: teacher.status,
      teacherId: teacher.teacherId,
      createdAt: FormatDate.formatFromIso(teacher.createdAt),
    }))

    return await DefaultPaginate.formatToDefaultPaginate<TeacherDtoResponse>({
      items: serializeItems,
      paginateProperties: teachers,
    })
  }
  public async updateRandomPassword(userId: number) {
    const updateTeacher = await Database.from('teachers')
      .where('userId', userId)
      .update({ randomPassword: false })

    return updateTeacher
  }

  public async getById(teacherId: number) {
    const teacher = await Database.from('teachers')
      .select(
        'users.id',
        'users.name',
        'users.phoneNumber',
        'users.email',
        'teachers.CPF as cpf',
        'teachers.status',
        'users.createdAt'
      )

      .join('users', 'users.id', '=', 'teachers.userId')
      .where('teachers.id', teacherId)
      .first()

    return teacher
  }
  public async getLessons(
    teacherId: number,
    currentPage: number = 1,
    numberlinesPerPage: number = 5
  ): Promise<DefaultPaginateDtoResponse<LessonByTeacherDto>> {
    const lessons = await this.modelLessons
      .query()
      .where('teacherId', teacherId)
      .orderBy('createdAt', 'desc')
      .paginate(currentPage!, numberlinesPerPage)

    return await DefaultPaginate.formatToDefaultPaginate<LessonByTeacherDto>({
      items: lessons.all() as unknown as LessonByTeacherDto[],
      paginateProperties: lessons as unknown as SimplePaginatorContract<LessonByTeacherDto>,
    })
  }
}
