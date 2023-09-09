import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../Roles/RolesSeeder'))
    await this.runSeeder(await import('../Permissions/PermissionsSeeder'))
    await this.runSeeder(await import('../RolePermissions/RolePermissionsAdminSeeder'))
    await this.runSeeder(await import('../RolePermissions/RolePermissionsSchoolSeeder'))

    const isTestEnviroment = Application.inTest

    if (isTestEnviroment) {
      await this.runSeeder(await import('../Users/AdminSeeder'))
      await this.runSeeder(await import('../Users/SchoolSeeder'))
      await this.runSeeder(await import('../Users/TeacherSeeder'))
      await this.runSeeder(await import('../ClassSeeder/ClassSeeder'))
      await this.runSeeder(await import('../Users/StudentSeeder'))
    }
  }
}
