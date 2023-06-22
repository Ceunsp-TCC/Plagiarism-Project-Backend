import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateSchoolValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.maxLength(150)]),
    CNPJ: schema.string({}, [
      rules.unique({
        table: 'schools',
        column: 'CNPJ',
      }),
    ]),
    phoneNumber: schema.string({}, [rules.mobile()]),
    email: schema.string({}, [
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
      }),
    ]),
    password: schema.string({}, [rules.confirmed('confirmPassword')]),
    address: schema.object().members({
      CEP: schema.string(),
      complement: schema.string.optional(),
      number: schema.number.optional(),
    }),
  })

  public messages: CustomMessages = {}
}
