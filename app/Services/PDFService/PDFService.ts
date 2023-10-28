import pdf from 'pdf-parse'
import axios from 'axios'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import type { PDFServiceInterface } from 'App/Interfaces/Services/PDFServiceInterface'

export default class PDFService implements PDFServiceInterface {
  protected async getPDFInBytes(PDFUrl: string) {
    const getPDFInBytes = await axios.get(PDFUrl, { responseType: 'arraybuffer' })
    const pdfBytes = getPDFInBytes.data

    return pdfBytes
  }

  public async getText(PDFUrl: string): Promise<string> {
    const pdfBytes = await this.getPDFInBytes(PDFUrl)

    const pdfLoaded = await pdf(pdfBytes)
    const text = pdfLoaded.text

    return text
  }

  public async countWords(PDFUrl: string): Promise<number> {
    const text = await this.getText(PDFUrl)

    const textWithoutNewlines = text.replace(/\n/g, ' ')

    const words = textWithoutNewlines.split(/\s+/).filter((word) => word !== '')

    const wordCount = words.length

    return wordCount
  }

  public async create() {
    const pdfDoc = await PDFDocument.create()
    await pdfDoc.embedFont(StandardFonts.TimesRoman)

    return pdfDoc
  }
}
