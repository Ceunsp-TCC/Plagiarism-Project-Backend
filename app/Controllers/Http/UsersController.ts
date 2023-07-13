import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ValidEmailService from 'App/Services/UsersService/ValidEmailService'
import ValidZipCodeService from 'App/Services/UsersService/ValidZipCodeService'
import ValidEmailValidator from 'App/Validators/ValidEmailValidator'
import ValidZipCodeValidator from 'App/Validators/ValidZipCodeValidator'
import ViaCepServices from 'App/Services/Http/ViaCepServices/ViaCepServices'

export default class UsersController {
  private validEmailService: ValidEmailService
  private validZipCodeService: ValidZipCodeService

  constructor() {
    ;(this.validEmailService = new ValidEmailService()),
      (this.validZipCodeService = new ValidZipCodeService(new ViaCepServices()))
  }

  public async validEmail({ request }: HttpContextContract) {
    const payload = await request.validate(ValidEmailValidator)

    return await this.validEmailService.validEmail(payload.email)
  }
  public async validZipCode({ request }: HttpContextContract) {
    const payload = await request.validate(ValidZipCodeValidator)

    return await this.validZipCodeService.validZipCode(payload.zipcode)
  }
}
