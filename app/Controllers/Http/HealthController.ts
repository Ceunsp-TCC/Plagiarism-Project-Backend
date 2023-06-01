import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import DefaultResponse from 'App/Utils/DefaultResponse'

export default class HealthController {
  private defaultResponse: typeof DefaultResponse

  constructor() {
    this.defaultResponse = DefaultResponse
  }

  public async health() {
    const report = await HealthCheck.getReport()

    return await this.defaultResponse.successWithContent('Server is running', 200, report)
  }
}
