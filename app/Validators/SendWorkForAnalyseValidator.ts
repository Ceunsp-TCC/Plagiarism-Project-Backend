import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SendWorkForAnalyseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    work: schema.file({
      size: '200kb',
      extnames: ['pdf', 'txt'],
    }),
  })

  public messages: CustomMessages = {}
}
