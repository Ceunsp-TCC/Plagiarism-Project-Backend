import type { GetPlanOutput } from 'App/Services/types/Http/OrtographyServices/GetPlanResponse'
export interface OrtographyServiceInterface {
  correct(text: string): Promise<string>
  detectLanguage(text: string): Promise<string>
  getPlanData(): Promise<GetPlanOutput>
}
