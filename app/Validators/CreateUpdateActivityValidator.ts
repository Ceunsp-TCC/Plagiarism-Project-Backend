import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { ActivityType } from 'App/Dtos/Activities/ActivityDto'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUpdateActivityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string(),
    comments: schema.string.optional(),
    type: schema.enum([ActivityType.NOTICE, ActivityType.ACADEMICPAPER]),
  })

  public messages: CustomMessages = {}
}
