export interface PDFServiceInterface {
  countWords(PDFUrl: string): Promise<number>
  getText(PDFUrl: string): Promise<string>
}
