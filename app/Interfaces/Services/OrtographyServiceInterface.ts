export interface OrtographyServiceInterface {
  correct(text: string): Promise<string>
  detectLanguage(text: string): Promise<string>
}
