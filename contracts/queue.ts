export interface PlagiarismAnalyseAcademicPaperQueueProps {
  academicPaperId: number
  requesterId: number
}

export interface OrtographyCorrectionQueueProps {
  original: string
  identifier: string
  requesterId: number
}

export enum QueueNamesEnum {
  ANALYSE_ACADEMIC_PAPER = 'ANALYSE_ACADEMIC_PAPER',
  ORTOGRAPHY_CORRECTION = 'ORTOGRAPHY_CORRECTION',
}
