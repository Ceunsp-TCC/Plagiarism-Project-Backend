import HttpContext from '@ioc:Adonis/Core/HttpContext'

export default class CheckPermissions {
  private http: typeof HttpContext

  constructor() {
    this.http = HttpContext
  }

  public async checkHasPermission(namePermission: string) {
    const ctx = await this.http.get()
    const roleId = await ctx?.auth.user?.roleId
    const role = await ctx?.auth.user?.related('role').query().where('id', roleId!).first()
    const permissions = (await role?.related('permissions').query()!).map(
      (permission) => permission.name
    )

    return permissions?.includes(namePermission)
  }
}
