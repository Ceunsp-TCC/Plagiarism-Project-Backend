import AcademicPaperRepository from '@ioc:Repositories/AcademicPaperRepository'
import PlagiarismReportRepository from '@ioc:Repositories/PlagiarismReportRepository'
import PDF from '@ioc:Libraries/PDF'
import Plagiarism from '@ioc:ExternalApis/Plagiarism'

export default class PlagiarismAnalyseAcademicPaperQueue {
  private async sendToPartnerApi(text: string) {
    return await Plagiarism.createReport(text)
    //comment for mock
    // return {
    //   id: 10000,
    //   words: 10000,
    //   checkedWords: 10000,
    // }
  }

  private async generateReportInDatabase(
    academicPaperId: number,
    requesterId: number,
    externalId: number
  ) {
    return await PlagiarismReportRepository.create({
      academicPaperId: academicPaperId,
      requesterId,
      externalId,
    })
  }

  public async run(academicPaperId: number, requesterId: number) {
    const academicPaper = await AcademicPaperRepository.getById(academicPaperId)

    const text = await PDF.getText(academicPaper?.paper!)

    const partnerResponse = await this.sendToPartnerApi(text)

    const externalId = partnerResponse.id

    await this.generateReportInDatabase(academicPaperId, requesterId, externalId)
  }
}
