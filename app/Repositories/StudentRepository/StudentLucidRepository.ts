import Students from 'App/Models/Students'
import Database from '@ioc:Adonis/Lucid/Database'
import DefaultPaginate from '@ioc:Utils/DefaultPaginate'
import FormatDate from '@ioc:Utils/FormatDate'
import ClassSemesters from 'App/Models/ClassSemesters'
import ClassSemestersLessons from 'App/Models/ClassSemestersLessons'
import { DefaultPaginateDtoResponse } from 'App/Dtos/Utils/DefaultPaginateDto'
import type { StudentDtoResponse } from 'App/Dtos/Students/StudentDto'
import type StudentRepositoryInterface from 'App/Interfaces/Repositories/StudentRepositoryInterface'
import type { SimplePaginatorContract } from '@ioc:Adonis/Lucid/Database'
import type { LessonByStudentDto } from 'App/Dtos/Lessons/LessonByStudentDto'

export default class StudentLucidRepository implements StudentRepositoryInterface {
  constructor(
    private readonly model: typeof Students,
    private readonly modelSemesters: typeof ClassSemesters,
    private readonly modelLessons: typeof ClassSemestersLessons
  ) {}

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
  public async getLessons(
    studentId: number,
    currentPage?: number | undefined,
    numberlinesPerPage?: number | undefined
  ): Promise<DefaultPaginateDtoResponse<LessonByStudentDto>> {
    const student = await this.model.query().where('id', studentId).first()

    const semesters = await this.modelSemesters.query().where('classId', student?.classId!)

    const semestersIds = semesters.map((semester) => semester.id)

    const lessons = await this.modelLessons
      .query()
      .whereIn('classSemesterId', semestersIds)
      .orderBy('createdAt', 'desc')
      .paginate(currentPage!, numberlinesPerPage)

    return await DefaultPaginate.formatToDefaultPaginate<LessonByStudentDto>({
      items: lessons.all() as unknown as LessonByStudentDto[],
      paginateProperties: lessons as unknown as SimplePaginatorContract<LessonByStudentDto>,
    })
  }
}
