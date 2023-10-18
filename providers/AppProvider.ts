import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {}

  public async boot() {
    console.log('boot')
  }

  public async ready() {}

  public async shutdown() {}
}
