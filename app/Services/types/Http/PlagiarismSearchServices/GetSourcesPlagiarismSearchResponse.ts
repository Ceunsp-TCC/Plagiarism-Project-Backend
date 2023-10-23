export interface SourceFromPlagiarismSearch {
  report_id: number
  title: string
  url: string
  plagiarism: number
}

export interface GetSourcesData {
  sources: SourceFromPlagiarismSearch[]
}

export interface SourceFormatted {
  title: string
  url: string
  plagiarism: number
}
