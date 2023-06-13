import { plagiarismSearchApi } from 'App/Services/Apis/PlagiarismSearchApi'
import type { CreateReportDto } from 'App/Dtos/Services/Http/PlagiarismSearchServicesDto'
import type { CreateReportResponse } from 'App/Services/types/Http/PlagiarismSearchServices/CreateReportResponse'
import type { GetReportsResponse } from 'App/Services/types/Http/PlagiarismSearchServices/GetReportsResponse'
import type { GetReportByIdResponse } from 'App/Services/types/Http/PlagiarismSearchServices/GetReportByIdResponse'
import FormData from 'form-data'

class PlagiarismSearchServices {
  public async createReport(body: CreateReportDto): Promise<CreateReportResponse> {
    const formData = new FormData()

    for (const key in body) {
      formData.append(key, (body as any)[key])
    }
    const response = await plagiarismSearchApi.post<CreateReportResponse>(
      '/reports/create',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/formdata',
        },
      }
    )

    return response.data
  }
  public async getReports(): Promise<GetReportsResponse> {
    const response = await plagiarismSearchApi.get<GetReportsResponse>('/reports')

    return response.data
  }

  public async getReportById(id: number): Promise<GetReportByIdResponse> {
    const response = await plagiarismSearchApi.get<GetReportByIdResponse>(`/reports/${id}`)

    return response.data
  }
}

export default new PlagiarismSearchServices()
