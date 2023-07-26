import DefaultResponse from '@ioc:Utils/DefaultResponse'
import UserRepository from '@ioc:Repositories/UserRepository'
import CustomException from 'App/Exceptions/CustomException'
import TeacherRepository from '@ioc:Repositories/TeacherRepository'
import StudentRepository from '@ioc:Repositories/StudentRepository'

export default class UpdatePasswordService {
  public async updatePassword(userId: number, newPassword: string) {
    const findUser = await UserRepository.findUserById(userId)

    if (!findUser) {
      throw new CustomException('User not found', 404)
    }

    const isEnabledToRemoveRandomPassword =
      findUser.roleName === 'TEACHER' || findUser.roleName === 'STUDENT'

    if (isEnabledToRemoveRandomPassword) {
      const isTeacher = findUser.roleName === 'TEACHER'
      const isStudent = findUser.roleName === 'STUDENT'

      if (isTeacher) {
        await TeacherRepository.updateRandomPassword(userId)
      }
      if (isStudent) {
        await StudentRepository.updateRandomPassword(userId)
      }
    }

    await UserRepository.updatePassword(userId, newPassword)

    return await DefaultResponse.success('Password updated', 200)
  }
}
