import BullMQ from '@ioc:Adonis/Addons/BullMQ'
import { BaseCommand } from '@adonisjs/core/build/standalone'
import { QueueNamesEnum } from 'Contracts/queue'

export default class QueueListener extends BaseCommand {
  public static commandName = 'queue:listener'

  public static settings = {
    loadApp: true,
    stayAlive: true,
  }

  public async run() {
    BullMQ.worker<any, any>(QueueNamesEnum.ANALYSE_ACADEMIC_PAPER, async (job) => {
      const isStarted = job.isActive()
      this.logger.info('Analyse plagiarism queue started')

      return job
    })

    await this.exit()
  }
}
