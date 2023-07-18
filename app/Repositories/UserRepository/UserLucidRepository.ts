import type UserRepositoryInterface from 'App/Interfaces/Repositories/UserRepositoryInterface'
import type { SchoolDto } from 'App/Dtos/Schools/SchoolDto'
import Users from 'App/Models/Users'
import type { UserDto } from 'App/Dtos/UserDto/UserDto'
import Schools from 'App/Models/Schools'
import Teachers from 'App/Models/Teachers'
import type { TeacherDto } from 'App/Dtos/Teachers/TeacherDto'

export default class UserLucidRepository implements UserRepositoryInterface {
  constructor(private readonly model: typeof Users) {}
  public async createSchool(user: UserDto, school: SchoolDto): Promise<Schools> {
    const create = await this.model.create(user)

    return await create.related('school').create(school)
  }
  public async findByEmail(email: string): Promise<Users | null> {
    return await this.model.findBy('email', email)
  }

  public async createTeacher(user: UserDto, teacher: TeacherDto): Promise<Teachers> {
    const create = await this.model.create(user)

    return await create.related('teacher').create(teacher)
  }

  public async findSchoolByCnpj(CNPJ: string): Promise<Users | null> {
    return await this.model
      .query()
      .whereHas('school', (query) => {
        query.where('CNPJ', CNPJ)
      })
      .first()
  }

  public async findUserById(id: number): Promise<Users | null> {
    return await this.model.findBy('id', id)
  }

  public async updateSchoolStatus(
    status: 'INREVIEW' | 'CANCELED' | 'COMPLETED',
    id: number
  ): Promise<boolean> {
    const school = await (await this.model.findBy('id', id))?.related('school')

    await school?.query().update({ status })

    return true
  }
}
