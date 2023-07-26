import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ValidEmailService from 'App/Services/UsersService/ValidEmailService'
import ValidZipCodeService from 'App/Services/UsersService/ValidZipCodeService'
import ValidEmailValidator from 'App/Validators/ValidEmailValidator'
import ValidZipCodeValidator from 'App/Validators/ValidZipCodeValidator'
import UpdatePasswordService from 'App/Services/UsersService/UpdatePasswordService'
import UpdatePasswordValidator from 'App/Validators/UpdatePasswordValidator'

export default class UsersController {
  private validEmailService: ValidEmailService
  private validZipCodeService: ValidZipCodeService
  private updatePasswordService: UpdatePasswordService

  constructor() {
    ;(this.validEmailService = new ValidEmailService()),
      (this.validZipCodeService = new ValidZipCodeService())
    this.updatePasswordService = new UpdatePasswordService()
  }

  public async validEmail({ request }: HttpContextContract) {
    const payload = await request.validate(ValidEmailValidator)

    return await this.validEmailService.validEmail(payload.email)
  }
  public async validZipCode({ request }: HttpContextContract) {
    const payload = await request.validate(ValidZipCodeValidator)

    return await this.validZipCodeService.validZipCode(payload.zipcode)
  }

  public async updatePassword({ request, params }: HttpContextContract) {
    const payload = await request.validate(UpdatePasswordValidator)
    const userId = parseInt(params.id)

    return await this.updatePasswordService.updatePassword(userId, payload.password)
  }
}
