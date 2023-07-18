import DefaultResponse from '@ioc:Utils/DefaultResponse'
import UserRepository from '@ioc:Repositories/UserRepository'
import RoleRepository from '@ioc:Repositories/RoleRepository'
import type { CreateTeacherDto } from 'App/Dtos/Services/TeacherServices/CreateTeacherDto'

export default class CreateTeacherService {
  public async create({
    name,
    email,
    password,
    phoneNumber,
    CPF,
    CND,
    schoolId,
  }: CreateTeacherDto) {
    const roleTeacher = await RoleRepository.findByName('TEACHER')

    const user = {
      name,
      email,
      phoneNumber: phoneNumber.replace(/\D/g, ''),
      password,
      roleName: 'TEACHER',
      roleId: roleTeacher?.id!,
    }
    const teacher = {
      CPF: CPF.replace(/\D/g, ''),
      CND: CND.replace(/\D/g, ''),
      schoolId,
    }

    await UserRepository.createTeacher(user, teacher)

    return await DefaultResponse.success('Teacher created successfully', 201)
  }
}
