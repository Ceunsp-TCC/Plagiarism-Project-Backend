import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LinkTeacherAndLessonValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    lessonId: schema.number(),
    teacherId: schema.number(),
  })

  public messages: CustomMessages = {}
}
