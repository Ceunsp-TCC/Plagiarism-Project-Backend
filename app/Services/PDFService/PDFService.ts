import pdf from 'pdf-parse'
import axios from 'axios'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib'
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

  public async modify(PDFUrl: string) {
    const pdfBytes = await this.getPDFInBytes(PDFUrl)
    const pdfDoc = await PDFDocument.load(pdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()

    firstPage.drawText('This text was added with JavaScript!', {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    })

    awai
  }
}
