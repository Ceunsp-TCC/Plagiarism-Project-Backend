import Teachers from 'App/Models/Teachers'
import type TeacherRepositoryInterface from 'App/Interfaces/Repositories/TeacherRepositoryInterface'
import Database from '@ioc:Adonis/Lucid/Database'
import type { TeacherDtoResponse } from 'App/Dtos/Teachers/TeacherDto'
import DefaultPaginate from '@ioc:Utils/DefaultPaginate'
import FormatDate from '@ioc:Utils/FormatDate'

export default class TeacherLucidRepository implements TeacherRepositoryInterface {
  //@ts-ignore
  constructor(private readonly model: typeof Teachers) {}

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
        'users.createdAt'
      )

      .join('users', 'users.id', '=', 'teachers.userId')
      .where('teachers.schoolId', schoolId)
      .where((query) => {
        if (name) {
          query.whereILike('users.name', `%${name}%`)
        }
      })
      .paginate(currentPage!, numberlinesPerPage)

    const items = (await teachers.all()) as TeacherDtoResponse[]

    const serializeItems = items.map((teacher) => ({
      id: teacher.id,
      name: teacher.name,
      phoneNumber: teacher.phoneNumber,
      email: teacher.email,
      cpf: teacher.cpf,
      status: teacher.status,
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
}
