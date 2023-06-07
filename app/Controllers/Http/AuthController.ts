import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginService from 'App/Services/AuthServices/LoginService'
import MeService from 'App/Services/AuthServices/MeService'
import LogoutService from 'App/Services/AuthServices/LogoutService'
import DefaultResponse from 'App/Utils/DefaultResponse'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import SchoolLucidRepository from 'App/Repositories/SchoolRepository/SchoolLucidRepository'
import Schools from 'App/Models/Schools'
import LoginValidator from 'App/Validators/LoginValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  private loginService: LoginService
  private meService: MeService
  private logoutService: LogoutService
  constructor() {
    this.loginService = new LoginService(
      new DefaultResponse(),
      HttpContext,
      new SchoolLucidRepository(Schools),
      Hash
    )
    this.meService = new MeService(HttpContext, new DefaultResponse())
    this.logoutService = new LogoutService(HttpContext, new DefaultResponse())
  }
  public async login({ request }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)

    return await this.loginService.login(payload.email, payload.password)
  }
  public async me() {
    return await this.meService.me()
  }

  public async logout() {
    return await this.logoutService.logout()
  }
}
