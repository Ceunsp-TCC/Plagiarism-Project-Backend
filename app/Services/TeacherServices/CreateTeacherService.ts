import DefaultResponse from '@ioc:Utils/DefaultResponse'
import UserRepository from '@ioc:Repositories/UserRepository'
import RoleRepository from '@ioc:Repositories/RoleRepository'
import type { CreateTeacherDto } from 'App/Dtos/Services/TeacherServices/CreateTeacherDto'
import { faker } from '@faker-js/faker'

export default class CreateTeacherService {
  public async create({ name, email, phoneNumber, CPF, CND, schoolId }: CreateTeacherDto) {
    const roleTeacher = await RoleRepository.findByName('TEACHER')

    const user = {
      name,
      email,
      phoneNumber: phoneNumber.replace(/\D/g, ''),
      password: faker.internet.password(10),
      roleName: 'TEACHER',
      roleId: roleTeacher?.id!,
    }
    const teacher = {
      CPF: CPF.replace(/\D/g, ''),
      CND: CND.replace(/\D/g, ''),
      schoolId,
    }

    await UserRepository.createTeacher(user, teacher)

    const content = {
      randomPassword: user.password,
    }

    return await DefaultResponse.successWithContent('Teacher created successfully', 201, content)
  }
}
