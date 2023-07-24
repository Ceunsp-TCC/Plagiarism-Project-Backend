import DefaultResponse from '@ioc:Utils/DefaultResponse'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import UserRepository from '@ioc:Repositories/UserRepository'
import Hash from '@ioc:Adonis/Core/Hash'
import CustomException from 'App/Exceptions/CustomException'

export default class LoginService {
  public async login(email: string, password: string) {
    const ctx = await HttpContext.get()
    const user = await UserRepository.findByEmail(email)
    const isInvalidCredentials = !user || !(await Hash.verify(user?.password!, password))

    if (isInvalidCredentials) {
      throw new CustomException('Invalid Credentials', 401)
    }

    let userInfos
    const token = await ctx?.auth.use('api').generate(user)
    const isSchool = (await ctx?.auth.user?.roleName) === 'SCHOOL'
    const isAdmin = (await ctx?.auth.user?.roleName) === 'ADMIN'
    const isTeacher = (await ctx?.auth.user?.roleName) === 'TEACHER'
    const isStudent = (await ctx?.auth.user?.roleName) === 'STUDENT'
    const roleId = await ctx?.auth.user?.roleId
    const role = await ctx?.auth.user?.related('role').query().where('id', roleId!).first()
    const permissions = (await role?.related('permissions').query()!).map(
      (permission) => permission.name
    )
    const userData = await ctx?.auth.user?.serialize()

    if (isSchool) {
      const school = await ctx?.auth.user?.related('school').query().first()
      const schoolInReviewOrCanceled =
        school?.status === 'CANCELED' || school?.status === 'INREVIEW'
      if (schoolInReviewOrCanceled) {
        throw new CustomException(
          'Access denied. The user account is currently under review or has been canceled',
          403
        )
      }
      userInfos = {
        ...userData,
        schoolData: school,
        permissions,
      }
    }

    if (isTeacher) {
      const teacher = await ctx?.auth.user?.related('teacher').query().first()
      const teacherInactive = teacher?.status === 'INACTIVE'

      if (teacherInactive) {
        throw new CustomException('Access denied. The user account is inactive', 403)
      }
      userInfos = {
        ...userData,
        teacherData: teacher,
        permissions,
      }
    }
    if (isStudent) {
      const student = await ctx?.auth.user?.related('student').query().first()
      const studentInactive = student?.status === 'INACTIVE'

      if (studentInactive) {
        throw new CustomException('Access denied. The user account is inactive', 403)
      }
      userInfos = {
        ...userData,
        studentData: student,
        permissions,
      }
    }

    if (isAdmin) {
      userInfos = {
        ...userData,
        permissions: permissions,
      }
    }
    const data = {
      accessToken: token,
      user: userInfos,
    }

    return await DefaultResponse.successWithContent('Authenticated', 200, data)
  }
}
