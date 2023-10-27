export interface PlagiarismAnalyseAcademicPaperQueueProps {
  academicPaperId: number
  requesterId: number
}

export interface OrtographyCorrectionQueueProps {
  original: string
}

export enum QueueNamesEnum {
  ANALYSE_ACADEMIC_PAPER = 'ANALYSE_ACADEMIC_PAPER',
  ORTOGRAPHY_CORRECTION = 'ORTOGRAPHY_CORRECTION',
}
