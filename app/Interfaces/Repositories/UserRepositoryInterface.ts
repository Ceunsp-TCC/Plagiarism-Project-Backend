import { SchoolDto } from 'App/Dtos/Schools/SchoolDto'
import { UserDto } from 'App/Dtos/UserDto/UserDto'
import Users from 'App/Models/Users'
import Schools from 'App/Models/Schools'

export default interface UserRepositoryInterface {
  createSchool(user: UserDto, school: SchoolDto): Promise<Schools>
  findByEmail(email: string): Promise<Users | null>
  findSchoolByCnpj(CNPJ: string): Promise<Users | null>
  findUserById(id: number): Promise<Users | null>
  updateSchoolStatus(status: 'INREVIEW' | 'CANCELED' | 'COMPLETED', id: number): Promise<boolean>
}
