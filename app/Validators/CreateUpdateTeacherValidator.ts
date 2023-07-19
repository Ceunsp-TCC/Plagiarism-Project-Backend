import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUpdateTeacherValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.maxLength(150)]),
    phoneNumber: schema.string({}, [rules.mobile()]),
    email: schema.string({}, [
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
      }),
    ]),
    CPF: schema.string({}, [
      rules.unique({
        table: 'teachers',
        column: 'CPF',
      }),
    ]),
    CND: schema.string(),
  })

  public messages: CustomMessages = {}
}
