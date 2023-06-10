import DefaultResponse from 'App/Utils/DefaultResponse'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import UserLucidRepository from 'App/Repositories/UserRepository/UserLucidRepository'
import Hash from '@ioc:Adonis/Core/Hash'
import CustomException from 'App/Exceptions/CustomException'

export default class LoginService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly httpContext: typeof HttpContext,
    private readonly userRepository: UserLucidRepository,
    private readonly hash: typeof Hash
  ) {
    this.defaultResponse = defaultResponse
    this.httpContext = httpContext
    this.userRepository = userRepository
    this.hash = hash
  }
  public async login(email: string, password: string) {
    const ctx = await this.httpContext.get()
    const user = await this.userRepository.findByEmail(email)
    const isInvalidCredentials = !user || !(await this.hash.verify(user?.password!, password))

    if (isInvalidCredentials) {
      throw new CustomException('Invalid Credentials', 401)
    }

    const isSchool = user.roleName === 'SCHOOL'

    if (isSchool) {
      const school = await user.related('school').query().first()
      const statusSchool = await school?.status

      const schoolInReviewOrCanceled = statusSchool === 'INREVIEW' || statusSchool === 'CANCELED'

      if (schoolInReviewOrCanceled) {
        throw new CustomException(
          'Access denied. The user account is currently under review or has been canceled',
          403
        )
      }
    }
    const token = await ctx?.auth.use('api').generate(user)

    const data = {
      accessToken: token,
      user: await token?.user,
    }

    return await this.defaultResponse.successWithContent('Authenticated', 200, data)
  }
}
