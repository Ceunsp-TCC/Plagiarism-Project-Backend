import AcademicPaperRepository from '@ioc:Repositories/AcademicPaperRepository'
import PlagiarismReportRepository from '@ioc:Repositories/PlagiarismReportRepository'
import PDF from '@ioc:Libraries/PDF'

export default class OrtographyCorrectionQueue {
  private async sendToPartnerApi(text: string) {}

  public async run(original: string) {
    const originalText = await PDF.getText(original)

    console.log(originalText)
  }
}
