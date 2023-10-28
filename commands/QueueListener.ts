import BullMQ from '@ioc:Adonis/Addons/BullMQ'
import { BaseCommand } from '@adonisjs/core/build/standalone'
import {
  QueueNamesEnum,
  PlagiarismAnalyseAcademicPaperQueueProps,
  OrtographyCorrectionQueueProps,
} from 'Contracts/queue'
import PlagiarismAnalyseAcademicPaperQueue from 'App/Queues/PlagiarismAnalyseAcademicPaperQueue'
import OrtographyCorrectionQueue from 'App/Queues/OrtographyCorrectionQueue'
import { DateTime } from 'luxon'

export default class QueueListener extends BaseCommand {
  public static commandName = 'queue:listener'

  public static settings = {
    loadApp: true,
    stayAlive: true,
  }

  public async run() {
    const nowDate = DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss')
    BullMQ.worker<PlagiarismAnalyseAcademicPaperQueueProps, any>(
      QueueNamesEnum.ANALYSE_ACADEMIC_PAPER,
      async (job) => {
        this.logger.info(`Plagiarism analyse queue - STARTED - ${nowDate} `)
        const queue = new PlagiarismAnalyseAcademicPaperQueue()

        await queue.run(job.data.academicPaperId, job.data.requesterId)

        this.logger.success(`Plagiarism analyse queue - COMPLETED - ${nowDate}`)
        return job
      }
    )

    BullMQ.worker<OrtographyCorrectionQueueProps, any>(
      QueueNamesEnum.ORTOGRAPHY_CORRECTION,
      async (job) => {
        this.logger.info(`Ortography correction queue - STARTED - ${nowDate}`)
        const queue = new OrtographyCorrectionQueue()

        await queue.run(job.data.original, job.data.identifier, job.data.requesterId)

        this.logger.success(`Ortography correction queue - COMPLETED - ${nowDate}`)
        return job
      }
    )
  }
}
