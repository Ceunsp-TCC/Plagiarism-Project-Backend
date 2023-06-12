import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomException from 'App/Exceptions/CustomException'

export default class PermissionMiddleware {
  public async handle(
    { bouncer }: HttpContextContract,
    next: () => Promise<void>,
    guards?: string[]
  ) {
    const policy = guards![0]
    const permission = guards![1]
    const resourceDenied = await bouncer.with(policy as any).denies(permission)
    if (resourceDenied) {
      throw new CustomException('Access to this resource is denied', 403)
    }

    await next()
  }
}
