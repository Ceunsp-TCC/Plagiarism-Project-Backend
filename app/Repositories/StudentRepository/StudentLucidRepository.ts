import Students from 'App/Models/Students'
import Database from '@ioc:Adonis/Lucid/Database'
import DefaultPaginate from '@ioc:Utils/DefaultPaginate'
import FormatDate from '@ioc:Utils/FormatDate'
import type { StudentDtoResponse } from 'App/Dtos/Students/StudentDto'
import type StudentRepositoryInterface from 'App/Interfaces/Repositories/StudentRepositoryInterface'

export default class StudentLucidRepository implements StudentRepositoryInterface {
  //@ts-ignore
  constructor(private readonly model: typeof Students) {}

  public async getAll(
    schoolId: number,
    currentPage: number = 1,
    numberlinesPerPage: number = 5,
    name: string = ''
  ) {
    const students = await Database.from('students')
      .select(
        'users.id',
        'users.name',
        'users.phoneNumber',
        'users.email',
        'students.CPF as cpf',
        'students.status',
        'users.createdAt'
      )

      .join('users', 'users.id', '=', 'students.userId')
      .where('students.schoolId', schoolId)
      .where((query) => {
        if (name) {
          query.whereILike('users.name', `%${name}%`)
        }
      })
      .orderBy('users.createdAt', 'desc')
      .paginate(currentPage!, numberlinesPerPage)

    const items = (await students.all()) as StudentDtoResponse[]

    const serializeItems = items.map((student) => ({
      id: student.id,
      name: student.name,
      phoneNumber: student.phoneNumber,
      email: student.email,
      cpf: student.cpf,
      status: student.status,
      createdAt: FormatDate.formatFromIso(student.createdAt),
    }))

    return await DefaultPaginate.formatToDefaultPaginate<StudentDtoResponse>({
      items: serializeItems,
      paginateProperties: students,
    })
  }
  public async getByClass(
    classId: number,
    currentPage: number = 1,
    numberlinesPerPage: number = 5,
    name: string = ''
  ) {
    const students = await Database.from('students')
      .select(
        'users.id',
        'users.name',
        'users.phoneNumber',
        'users.email',
        'students.CPF as cpf',
        'students.status',
        'users.createdAt'
      )

      .join('users', 'users.id', '=', 'students.userId')
      .where('students.classId', classId)
      .where((query) => {
        if (name) {
          query.whereILike('users.name', `%${name}%`)
        }
      })
      .orderBy('users.createdAt', 'desc')
      .paginate(currentPage!, numberlinesPerPage)

    const items = (await students.all()) as StudentDtoResponse[]

    const serializeItems = items.map((student) => ({
      id: student.id,
      name: student.name,
      phoneNumber: student.phoneNumber,
      email: student.email,
      cpf: student.cpf,
      status: student.status,
      createdAt: FormatDate.formatFromIso(student.createdAt),
    }))

    return await DefaultPaginate.formatToDefaultPaginate<StudentDtoResponse>({
      items: serializeItems,
      paginateProperties: students,
    })
  }
  public async updateRandomPassword(userId: number) {
    const updateStudent = await Database.from('students')
      .where('userId', userId)
      .update({ randomPassword: false })

    return updateStudent
  }
}
