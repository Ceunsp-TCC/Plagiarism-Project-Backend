import type { PDFServiceInterface } from 'App/Interfaces/Services/PDFServiceInterface'
import pdf from 'pdf-parse'
import axios from 'axios'

export default class PDFService implements PDFServiceInterface {
  public async getText(PDFUrl: string): Promise<string> {
    const getPDFInBytes = await axios.get(PDFUrl, { responseType: 'arraybuffer' })
    const pdfBytes = getPDFInBytes.data

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
}
