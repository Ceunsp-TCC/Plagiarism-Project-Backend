import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUpdateLessonValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}),
    description: schema.string.optional(),
    local: schema.string({}),
  })

  public messages: CustomMessages = {}
}
