import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ValidEmailService from 'App/Services/UsersService/ValidEmailService'
import ValidZipCodeService from 'App/Services/UsersService/ValidZipCodeService'
import DefaultResponse from 'App/Utils/DefaultResponse'
import UserLucidRepository from 'App/Repositories/UserRepository/UserLucidRepository'
import ValidEmailValidator from 'App/Validators/ValidEmailValidator'
import ValidZipCodeValidator from 'App/Validators/ValidZipCodeValidator'
import Users from 'App/Models/Users'
import ViaCepServices from 'App/Services/Http/ViaCepServices/ViaCepServices'

export default class UsersController {
  private validEmailService: ValidEmailService
  private validZipCodeService: ValidZipCodeService

  constructor() {
    ;(this.validEmailService = new ValidEmailService(
      new DefaultResponse(),
      new UserLucidRepository(Users)
    )),
      (this.validZipCodeService = new ValidZipCodeService(
        new DefaultResponse(),
        new ViaCepServices()
      ))
  }

  public async validEmail({ request }: HttpContextContract) {
    const payload = await request.validate(ValidEmailValidator)

    return await this.validEmailService.validEmail(payload.email)
  }
  public async validZipCode({ request }: HttpContextContract) {
    const payload = await request.validate(ValidZipCodeValidator)
    console.log(payload)
    return await this.validZipCodeService.validZipCode(payload.zipcode)
  }
}
