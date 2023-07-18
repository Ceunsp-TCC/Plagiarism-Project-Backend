import { SchoolDto } from 'App/Dtos/Schools/SchoolDto'
import { UserDto } from 'App/Dtos/UserDto/UserDto'
import { TeacherDto } from 'App/Dtos/Teachers/TeacherDto'
import Users from 'App/Models/Users'
import Schools from 'App/Models/Schools'
import Teachers from 'App/Models/Teachers'

export default interface UserRepositoryInterface {
  createSchool(user: UserDto, school: SchoolDto): Promise<Schools>
  createTeacher(user: UserDto, teacher: TeacherDto): Promise<Teachers>
  findByEmail(email: string): Promise<Users | null>
  findSchoolByCnpj(CNPJ: string): Promise<Users | null>
  findUserById(id: number): Promise<Users | null>
  updateSchoolStatus(status: 'INREVIEW' | 'CANCELED' | 'COMPLETED', id: number): Promise<boolean>
}
