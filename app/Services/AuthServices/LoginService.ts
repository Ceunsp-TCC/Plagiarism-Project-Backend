import DefaultResponse from 'App/Utils/DefaultResponse'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import SchoolLucidRepository from 'App/Repositories/SchoolRepository/SchoolLucidRepository'
import Hash from '@ioc:Adonis/Core/Hash'
import CustomException from 'App/Exceptions/CustomException'

export default class LoginService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly httpContext: typeof HttpContext,
    private readonly schoolRepository: SchoolLucidRepository,
    private readonly hash: typeof Hash
  ) {
    this.defaultResponse = defaultResponse
    this.httpContext = httpContext
    this.schoolRepository = schoolRepository
    this.hash = hash
  }
  public async login(email: string, password: string) {
    const ctx = await this.httpContext.get()
    const school = await this.schoolRepository.findByEmail(email)
    const isInvalidCredentials = !school || !(await this.hash.verify(school?.password!, password))

    if (isInvalidCredentials) {
      throw new CustomException('Invalid Credentials', 401)
    }

    const userInReviewOrCanceled = school.status === 'INREVIEW' || school.status === 'CANCELED'

    if (userInReviewOrCanceled) {
      throw new CustomException(
        'Access denied. The user account is currently under review or has been canceled',
        403
      )
    }

    const token = await ctx?.auth.use('api').generate(school)

    const data = {
      accessToken: token,
      user: await token?.user,
    }

    return await this.defaultResponse.successWithContent('Authenticated', 200, data)
  }
}
