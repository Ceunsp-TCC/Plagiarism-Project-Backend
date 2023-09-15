import DefaultResponse from '@ioc:Utils/DefaultResponse'
import UserRepository from '@ioc:Repositories/UserRepository'
import RoleRepository from '@ioc:Repositories/RoleRepository'
import type { CreateStudentDto } from 'App/Dtos/Services/StudentServices/CreateStudentDto'
import { faker } from '@faker-js/faker'

export default class CreateStudentService {
  public async create({ name, email, phoneNumber, CPF, schoolId, classId }: CreateStudentDto) {
    const roleTeacher = await RoleRepository.findByName('STUDENT')

    const user = {
      name,
      email,
      phoneNumber: phoneNumber.replace(/\D/g, ''),
      password: faker.internet.password(10),
      roleName: 'STUDENT',
      roleId: roleTeacher?.id!,
    }
    const student = {
      CPF: CPF.replace(/\D/g, ''),
      schoolId,
      classId,
    }

    await UserRepository.createStudent(user, student)

    const content = {
      randomPassword: user.password,
    }

    return await DefaultResponse.successWithContent('Student created successfully', 201, content)
  }
}
