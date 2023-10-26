import { BaseCommand } from '@adonisjs/core/build/standalone'
import puppeteer from 'puppeteer'
import Ntfy from '@ioc:ExternalApis/Ntfy'
import Env from '@ioc:Adonis/Core/Env'

export default class PlagiarismSearchInvoiceCronJob extends BaseCommand {
  public static commandName = 'plagiarism-search-invoice:cron-job'

  public static settings = {
    loadApp: true,
  }

  public async run() {
    this.logger.info('PlagiarismSearchInvoiceCronJob - Started')

    const userName = Env.get('PLAGIARISM_SEARCH_USER')
    const password = Env.get('PLAGIARISM_SEARCH_PASSWORD')

    const browserlessUrl = Env.get('BROWSERLESS_URL')
    const browserlessToken = Env.get('BROWSERLESS_TOKEN')

    try {
      const browser = await puppeteer.connect({
        browserWSEndpoint: `${browserlessUrl}?token=${browserlessToken}`,
      })

      const page = await browser.newPage()

      await page.goto('https://plagiarismsearch.com/account/login')

      const emailInput = await page.$('[name="login"]')
      const passwordInput = await page.$('[name="password"]')
      const button = await page.$('.account-submit')

      await emailInput!.type(userName)
      await passwordInput?.type(password)
      await button?.click()

      await page.waitForNavigation()

      await page.goto('https://plagiarismsearch.com/account/settings')

      const strongElements = await page.$$('strong')

      const strongContents: string[] = []

      for (const strong of strongElements) {
        const textContent = await page.evaluate((element) => String(element.textContent), strong)

        strongContents.push(textContent)
      }

      const remainingWordsIndex = 0

      const remainingWords = strongContents[remainingWordsIndex]

      const notificationBody = {
        topic: Env.get('NTFY_TOPIC_NOTIFICATIONS'),
        title: 'Plagiarism Search API Status',
        message: `You have ${remainingWords} remaining words`,
      }

      await Ntfy.sendNotification(notificationBody)

      await page.close()
      await browser.close()
      this.logger.success('PlagiarismSearchInvoiceCronJob - COMPLETED')
    } catch (error) {
      this.logger.error(error)
    }
  }
}
