import type UserRepositoryInterface from 'App/Interfaces/Repositories/UserRepositoryInterface'
import type { SchoolDto } from 'App/Dtos/Schools/SchoolDto'
import Users from 'App/Models/Users'
import { UserDto } from 'App/Dtos/UserDto/UserDto'

export default class UserLucidRepository implements UserRepositoryInterface {
  constructor(private readonly model: typeof Users) {
    this.model = model
  }
  public async createSchool(user: UserDto, school: SchoolDto): Promise<boolean> {
    const create = await this.model.create(user)

    await create.related('school').create(school)
    return true
  }
  public async findByEmail(email: string): Promise<Users | null> {
    return await this.model.findBy('email', email)
  }
}
