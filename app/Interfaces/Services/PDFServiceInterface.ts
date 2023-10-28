import type { PDFDocument } from 'pdf-lib'

export interface PDFServiceInterface {
  countWords(PDFUrl: string): Promise<number>
  getText(PDFUrl: string): Promise<string>
  create(): Promise<PDFDocument>
}
