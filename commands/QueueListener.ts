import BullMQ from '@ioc:Adonis/Addons/BullMQ'
import { BaseCommand } from '@adonisjs/core/build/standalone'
import { QueueNamesEnum, PlagiarismAnalyseAcademicPaperQueueProps } from 'Contracts/queue'
import PlagiarismAnalyseAcademicPaperQueue from 'App/Queues/PlagiarismAnalyseAcademicPaperQueue'

export default class QueueListener extends BaseCommand {
  public static commandName = 'queue:listener'

  public static settings = {
    loadApp: true,
    stayAlive: true,
  }

  public async run() {
    BullMQ.worker<PlagiarismAnalyseAcademicPaperQueueProps, any>(
      QueueNamesEnum.ANALYSE_ACADEMIC_PAPER,
      async (job) => {
        this.logger.info('Plagiarism analyse queue started')
        const queue = new PlagiarismAnalyseAcademicPaperQueue()

        await queue.run(job.data.academicPaperId, job.data.requesterId)

        this.logger.success('Plagiarism analyse queue completed')
        return job
      }
    )
  }
}
