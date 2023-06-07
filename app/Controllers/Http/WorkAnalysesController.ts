import SendWorkForAnalyseService from 'App/Services/WorkAnalysesService/SendWorkForAnalyseService'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import SendWorkForAnalyseValidator from 'App/Validators/SendWorkForAnalyseValidator'

export default class WorkAnalysesController {
  private sendWorkForAnalyseService: typeof SendWorkForAnalyseService
  constructor() {
    this.sendWorkForAnalyseService = SendWorkForAnalyseService
  }

  public async analyseWork({request}: HttpContextContract) {
    const payload = await request.validate(SendWorkForAnalyseValidator)

    const work = await payload.work
    return this.sendWorkForAnalyseService.sendWorkForAnalyseService(work!)
  }
}
// return await this.plagiarismSearchServices.createReport({
//   text: 'A Máquina de Turing é um dispositivo teórico conhecido como máquina universal, que foi concebido pelo matemático britânico Alan Turing',
//   title: 'First test',
// })
// return await this.plagiarismSearchServices.getReports()
