import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ValidSchoolDocumentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    document: schema.string(),
  })

  public messages: CustomMessages = {}
}
