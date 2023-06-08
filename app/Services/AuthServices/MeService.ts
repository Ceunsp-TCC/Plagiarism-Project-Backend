import DefaultResponse from 'App/Utils/DefaultResponse'
import HttpContext from '@ioc:Adonis/Core/HttpContext'

export default class MeService {
  constructor(
    private readonly httpContext: typeof HttpContext,
    private readonly defaultResponse: DefaultResponse
  ) {
    this.httpContext = httpContext
    this.defaultResponse = defaultResponse
  }
  public async me() {
    const ctx = await this.httpContext.get()

    const user = await ctx?.auth.user

    return await this.defaultResponse.successWithContent(
      'User information successfully returned',
      200,
      user
    )
  }
}
