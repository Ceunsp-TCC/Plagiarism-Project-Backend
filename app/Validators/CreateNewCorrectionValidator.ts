import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateNewCorrectionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userProvidedIdentifier: schema.string(),
    original: schema.file({
      size: '1mb',
      extnames: ['pdf'],
    }),
  })

  public messages: CustomMessages = {}
}
