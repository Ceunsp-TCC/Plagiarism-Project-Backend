export interface Response {
  api: Api
  api_ai: ApiAi
  transform: Transform
}

export interface Api {
  type: string
  period_start: string
  period_end: string
  total: number
  used: number
}

export interface ApiAi {
  type: string
  period_start: string
  period_end: string
  total: number
  used: number
}

export interface Transform {
  type: string
  period_start: string
  period_end: string
  total: number
  used: number
}

export interface GetPlanResponse {
  status: boolean
  response: Response
}

export interface GetPlanOutput {
  total: number
  used: number
}
