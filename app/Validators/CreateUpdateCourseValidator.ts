import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUpdateCourseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.maxLength(255),
      rules.unique({
        table: 'courses',
        column: 'name',
      }),
    ]),
    description: schema.string.optional(),
    modality: schema.enum(['HYBRID', 'INPERSON', 'ONLINE']),
    category: schema.string(),
    price: schema.number(),
    image: schema.file({
      size: '5mb',
      extnames: ['png', 'jpg'],
    }),
  })

  public messages: CustomMessages = {}
}
