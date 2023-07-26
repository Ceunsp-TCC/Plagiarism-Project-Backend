import Users from 'App/Models/Users'
import Schools from 'App/Models/Schools'
import Teachers from 'App/Models/Teachers'
import Students from 'App/Models/Students'
import type { SchoolDto } from 'App/Dtos/Schools/SchoolDto'
import type { UserDto } from 'App/Dtos/UserDto/UserDto'
import type { TeacherDto } from 'App/Dtos/Teachers/TeacherDto'
import type { StudentDto } from 'App/Dtos/Students/StudentDto'

export default interface UserRepositoryInterface {
  createSchool(user: UserDto, school: SchoolDto): Promise<Schools>
  createTeacher(user: UserDto, teacher: TeacherDto): Promise<Teachers>
  createStudent(user: UserDto, student: StudentDto): Promise<Students>
  findByEmail(email: string): Promise<Users | null>
  findSchoolByCnpj(CNPJ: string): Promise<Users | null>
  findUserById(id: number): Promise<Users | null>
  updateSchoolStatus(status: 'INREVIEW' | 'CANCELED' | 'COMPLETED', id: number): Promise<boolean>
  updatePassword(userId: number, newPassword: string): Promise<Users | undefined>
}
