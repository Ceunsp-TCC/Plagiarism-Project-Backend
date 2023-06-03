import DefaultResponse from 'App/Utils/DefaultResponse'
import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
// import Application from '@ioc:Adonis/Core/Application'
// import { cuid } from '@ioc:Adonis/Core/Helpers'
import {} from '@ioc:Adonis/Core/Helpers'

class SendWorkForAnalyseService {
  private defaultResponse: typeof DefaultResponse

  constructor() {
    this.defaultResponse = DefaultResponse
  }

  public async sendWorkForAnalyseService(_work: MultipartFileContract) {
    // const nameImage = `${work.clientName}${cuid()}.${work.extname}`

    // const workFile = await work.move(Application.tmpPath('uploads'), {
    //   name: nameImage,
    // })
    // console.log(Env.get('APP_URL') + (await Drive.getUrl(nameImage)))

    return await this.defaultResponse.success('Work successfully sent for analysis', 200)
  }
}

export default new SendWorkForAnalyseService()
