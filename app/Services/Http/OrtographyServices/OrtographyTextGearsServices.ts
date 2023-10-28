import { textGearsApi } from 'App/Services/Apis/TextGearsApi'
import { TextGearsCorrectResponse } from 'App/Services/types/Http/OrtographyServices/CorrectResponse'
import { TextGearsDetectLanguageResponse } from 'App/Services/types/Http/OrtographyServices/DetectLanguageResponse'
import Env from '@ioc:Adonis/Core/Env'
import { OrtographyServiceInterface } from 'App/Interfaces/Services/OrtographyServiceInterface'

export default class OrtographyTextGearsServices implements OrtographyServiceInterface {
  private apiKey: string

  constructor() {
    this.apiKey = Env.get('TEXT_GEARS_API_KEY')
  }

  public async correct(text: string): Promise<string> {
    const body = {
      text,
      language: 'en-GB',
      key: this.apiKey,
    }

    const { data: correctResponse } = await textGearsApi.post<TextGearsCorrectResponse>(
      '/correct',
      body
    )

    return correctResponse.response.corrected
  }

  public async detectLanguage(text: string): Promise<string> {
    const body = {
      text,
      language: 'en-GB',
      key: this.apiKey,
    }

    const { data: detectResponse } = await textGearsApi.post<TextGearsDetectLanguageResponse>(
      '/detect',
      body
    )

    return detectResponse.response.language
  }
}
