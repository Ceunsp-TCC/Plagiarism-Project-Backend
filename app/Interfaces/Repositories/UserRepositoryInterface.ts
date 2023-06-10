import { SchoolDto } from 'App/Dtos/Schools/SchoolDto'
import { UserDto } from 'App/Dtos/UserDto/UserDto'

export default interface UserRepositoryInterface {
  createSchool(user: UserDto, school: SchoolDto): Promise<boolean>
  // findByEmail(email: string): Promise<SchoolDto | null>
}
