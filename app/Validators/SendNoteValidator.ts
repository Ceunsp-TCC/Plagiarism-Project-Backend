import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SendNoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    note: schema.enum([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  })

  public messages: CustomMessages = {}
}
