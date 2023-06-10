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
    password: schema.string(),
    address: schema.object().members({
      CEP: schema.string(),
      street: schema.string(),
      district: schema.string(),
      city: schema.string(),
      state: schema.string({}, [rules.maxLength(2), rules.minLength(2)]),
      complement: schema.string.optional(),
      number: schema.number.optional(),
    }),
  })

  public messages: CustomMessages = {}
}
