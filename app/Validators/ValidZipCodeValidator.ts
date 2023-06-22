import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ValidZipCodeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    zipcode: schema.string(),
  })

  public messages: CustomMessages = {}
}
