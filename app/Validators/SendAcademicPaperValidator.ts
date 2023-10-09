import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SendAcademicPaperValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    comments: schema.string.optional(),
    paper: schema.file({
      size: '1mb',
      extnames: ['pdf'],
    }),
  })

  public messages: CustomMessages = {}
}
