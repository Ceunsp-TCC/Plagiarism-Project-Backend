import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class LibraryProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('Libraries/PDF', () => {
      const PDFService = require('App/Services/PDFService/PDFService').default

      return new PDFService()
    })
  }

  public async boot() {}

  public async ready() {}

  public async shutdown() {}
}
