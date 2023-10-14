export interface PDFServiceInterface {
  countWords(PDFUrl: string): Promise<number>
}
