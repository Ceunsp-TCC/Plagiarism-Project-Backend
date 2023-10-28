interface Response {
  language: string
  dialect: string
  probabilities: Probabilities
}

interface Probabilities {
  en: number
  it: number
  fr: number
  es: number
  de: number
  pt: number
  zh: number
  el: number
  ru: number
  ko: number
  jp: number
  ar: number
}

export interface TextGearsDetectLanguageResponse {
  status: boolean
  response: Response
}
