import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateSchoolStatusValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    status: schema.enum(['INREVIEW', 'COMPLETED', 'CANCELED']),
  })

  public messages: CustomMessages = {}
}
