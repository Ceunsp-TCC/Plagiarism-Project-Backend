import RolesPermissions from 'App/Models/RolesPermissions'
import type RolesPermissionsRepositoryInterface from 'App/Interfaces/Repositories/RolesPermissionsRepositoryInterface'
import type { Links } from 'App/Interfaces/Repositories/RolesPermissionsRepositoryInterface'

export default class RolesPermissionsLucidRepository
  implements RolesPermissionsRepositoryInterface
{
  constructor(private readonly model: typeof RolesPermissions) {
    this.model = model
  }

  public async create(links: Links[]): Promise<boolean> {
    await this.model.createMany(links)

    return true
  }
}
