import PDF from '@ioc:Libraries/PDF'
import fs from 'fs'
import Logger from '@ioc:Adonis/Core/Logger'
import Application from '@ioc:Adonis/Core/Application'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Ortography from '@ioc:ExternalApis/Ortography'
import NotificationsRepository from '@ioc:Repositories/NotificationsRepository'
import OrtographyCorrectionsRepository from '@ioc:Repositories/OrtographyCorrectionRepository'
import Env from '@ioc:Adonis/Core/Env'
import { OrtographyCorrectionStatus } from 'App/Models/OrtographyCorrections'

export default class OrtographyCorrectionQueue {
  protected filePath: string

  constructor() {
    this.filePath = '/uploads/ortographic-correction/results'
  }

  protected async getCorrectText(originalText: string) {
    return await Ortography.correct(originalText)
    //return 'The misspeling of werds in the sentance were quite noticable. I had a greate time, altho it wuz dificult to find my wai. The buisness hirings and requirments semed confusing andsomtimes unneccessary, affecting the hole process'
  }

  protected breakLines(text: string) {
    return text.match(/.{1,90}/g)
  }

  protected async generateResultPDF(text: string) {
    const generateNewPdf = await PDF.create()

    const page = generateNewPdf.addPage()
    const { height } = page.getSize()
    const fontSize = 12

    const lines = this.breakLines(text)
    const textY = height - 50

    lines!.forEach((line, index) => {
      page.drawText(line, {
        x: 50,
        y: textY - (fontSize + 5) * index,
        size: fontSize,
      })
    })

    return await generateNewPdf.save()
  }

  protected generatefileName(identifier: string) {
    return `${identifier}${cuid()}.pdf`
  }

  protected async writeResultFile(bytes: Uint8Array, nameFile: string) {
    fs.writeFile(Application.tmpPath(`${this.filePath}/${nameFile}`), bytes, (err) => {
      if (err) Logger.error('Failed to create result file', err)
    })
  }

  protected getResultFileUrl(fileName: string) {
    return `${Env.get('APP_URL')}/uploads/ortographic-correction/results/${fileName}`
  }

  protected async updateResultFile(identifier: string, fileUrl: string) {
    return await OrtographyCorrectionsRepository.updateResultCorrection(identifier, fileUrl)
  }

  protected async updateCorrectionStatus(identifier: string) {
    return await OrtographyCorrectionsRepository.updateStatus(
      identifier,
      OrtographyCorrectionStatus.COMPLETED
    )
  }

  private async createNotification(receiverId: number, ortographyCorrectionId: number) {
    const screen = `/ortography-corrections/${ortographyCorrectionId}`

    const notificationData = {
      message: `Boas notícias! A correção ortográfica do arquivo ${ortographyCorrectionId} foi finalizada.`,
      receiverId,
      data: {
        navigateTo: screen,
      },
    }
    return await NotificationsRepository.create(notificationData)
  }

  public async run(original: string, identifier: string, requesterId: number) {
    const originalText = await PDF.getText(original)

    const correctText = await this.getCorrectText(originalText)

    const pdfBytes = await this.generateResultPDF(correctText)

    const resultFileName = this.generatefileName(identifier)

    await this.writeResultFile(pdfBytes, resultFileName)

    const resultFileUrl = this.getResultFileUrl(resultFileName)

    await this.updateResultFile(identifier, resultFileUrl)

    await this.updateCorrectionStatus(identifier)

    const getOrtographyCorrection =
      await OrtographyCorrectionsRepository.findByUserProvidedIdentifier(identifier)

    const ortographyCorrectionId = getOrtographyCorrection?.id

    await this.createNotification(requesterId, ortographyCorrectionId!)
  }
}
