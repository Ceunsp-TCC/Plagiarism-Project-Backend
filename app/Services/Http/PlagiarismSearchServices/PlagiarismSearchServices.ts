import { plagiarismSearchApi } from 'App/Services/Apis/PlagiarismSearchApi'
import type {
  CreateReportReturn,
  CreateReportPlagiarismSearchResponse,
} from 'App/Services/types/Http/PlagiarismSearchServices/CreateReportResponse'
import Env from '@ioc:Adonis/Core/Env'
import type { PlagiarismServiceInterface } from 'App/Interfaces/Services/PlagiarismServiceInterface'
import type { DefaultResponsePlagiarismSearch } from 'App/Services/types/Http/PlagiarismSearchServices/DefaultResponse'

export default class PlagiarismSearchServices implements PlagiarismServiceInterface {
  private webHookUrl: string

  constructor() {
    this.webHookUrl = `${Env.get('APP_URL')}/v1/webhooks/plagiarism`
  }
  public async createReport(text: string): Promise<CreateReportReturn> {
    const body = {
      text,
      search_ai: 1,
      callback_url: this.webHookUrl,
    }
    const { data: reportResponse } = await plagiarismSearchApi.post<
      DefaultResponsePlagiarismSearch<CreateReportPlagiarismSearchResponse>
    >('/reports/create', body)

    return {
      id: reportResponse.data.id,
      words: reportResponse.data.words,
      checkedWords: reportResponse.data.checked_words,
    }
  }
}
