import { SchoolDto } from 'App/Dtos/Schools/SchoolDto'
import { UserDto } from 'App/Dtos/UserDto/UserDto'
import Users from 'App/Models/Users'

export default interface UserRepositoryInterface {
  createSchool(user: UserDto, school: SchoolDto): Promise<boolean>
  findByEmail(email: string): Promise<Users | null>
  findSchoolByCnpj(CNPJ: string): Promise<Users | null>
}
