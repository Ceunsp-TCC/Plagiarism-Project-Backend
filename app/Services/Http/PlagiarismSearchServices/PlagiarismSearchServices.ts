import { plagiarismSearchApi } from 'App/Services/Apis/PlagiarismSearchApi'
import type {
  CreateReportReturn,
  CreateReportPlagiarismSearchResponse,
} from 'App/Services/types/Http/PlagiarismSearchServices/CreateReportResponse'
import {
  GetSourcesData,
  SourceFormatted,
} from 'App/Services/types/Http/PlagiarismSearchServices/GetSourcesPlagiarismSearchResponse'
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
      callback_url: this.webHookUrl,
    }
    console.log('body', body)
    const { data: reportResponse } = await plagiarismSearchApi.post<
      DefaultResponsePlagiarismSearch<CreateReportPlagiarismSearchResponse>
    >('/reports/create', body)
    console.log('create-report', reportResponse.data)
    return {
      id: reportResponse.data.id,
      words: reportResponse.data.words,
      checkedWords: reportResponse.data.checked_words,
    }
  }

  public async getSources(reportId: number): Promise<SourceFormatted[]> {
    const { data: sourceResponse } = await plagiarismSearchApi.get<
      DefaultResponsePlagiarismSearch<GetSourcesData>
    >(`reports/sources/${reportId}`)

    return sourceResponse.data.sources.map((source) => ({
      title: source.title,
      url: source.url,
      plagiarism: source.plagiarism,
    }))
  }
}
