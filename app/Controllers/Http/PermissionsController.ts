import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePermissionService from 'App/Services/PermissionServices/CreatePermissionService'
import DefaultResponse from 'App/Utils/DefaultResponse'
import PermissionLucidRepository from 'App/Repositories/PermissionRepository/PermissionLucidRepository'
import Permissions from 'App/Models/Permissions'
import PermissionValidator from 'App/Validators/PermissionValidator'

export default class PermissionsController {
  private createPermissionService: CreatePermissionService

  constructor() {
    this.createPermissionService = new CreatePermissionService(
      new DefaultResponse(),
      new PermissionLucidRepository(Permissions)
    )
  }
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(PermissionValidator)

    return await this.createPermissionService.create(payload.name)
  }
}
