import { BaseCommand } from '@adonisjs/core/build/standalone'
import Ortography from '@ioc:ExternalApis/Ortography'
import Ntfy from '@ioc:ExternalApis/Ntfy'
import Env from '@ioc:Adonis/Core/Env'
import { DateTime } from 'luxon'

export default class TextGearsInvoiceCronJob extends BaseCommand {
  public static commandName = 'text-gears-invoice:cron-job'

  public static settings = {
    loadApp: true,
  }

  public async run() {
    const nowDate = DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss')
    this.logger.info(`TextGearsInvoiceCronJob - STARTED - ${nowDate}`)

    this.logger.info('Getting plan informations')
    const plan = await Ortography.getPlanData()

    this.logger.info('Calculating remaining plan')
    const total = plan.total
    const used = plan.used
    const remainingRequests = total - used
    const endPeriod = DateTime.fromISO(plan.endPeriod).toFormat('dd/MM/yyyy HH:mm:ss')

    this.logger.info(`Remaining requests: ${remainingRequests}`)

    const notificationBody = {
      topic: Env.get('NTFY_TOPIC_NOTIFICATIONS'),
      title: 'Text Gears API Status',
      message: `You have ${remainingRequests} remaining requests and your demo period end at ${endPeriod}`,
    }

    this.logger.info('Sending notification...')
    await Ntfy.sendNotification(notificationBody)

    this.logger.success(`TextGearsInvoiceCronJob - COMPLETED - ${nowDate}`)
  }
}
