import { BaseCommand } from '@adonisjs/core/build/standalone'
// import puppeteer from 'puppeteer'
// import Ntfy from '@ioc:ExternalApis/Ntfy'
// import Env from '@ioc:Adonis/Core/Env'
// import { DateTime } from 'luxon'
export default class PlagiarismSearchInvoiceCronJob extends BaseCommand {
  public static commandName = 'plagiarism-search-invoice:cron-job'

  public static settings = {
    loadApp: true,
  }

  public async run() {
    // let browser: any
    // const nowDate = DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss')
    // this.logger.info(`PlagiarismSearchInvoiceCronJob - STARTED - ${nowDate}`)
    // const TIMEOUT_GOTO = 60000 // sixty seconds
    // const userName = Env.get('PLAGIARISM_SEARCH_USER')
    // const password = Env.get('PLAGIARISM_SEARCH_PASSWORD')
    // const browserlessUrl = Env.get('BROWSERLESS_URL')
    // const browserlessToken = Env.get('BROWSERLESS_TOKEN')
    // try {
    //   this.logger.info('Opening the browser...')
    //   browser = await puppeteer.connect({
    //     browserWSEndpoint: `${browserlessUrl}?token=${browserlessToken}`,
    //   })
    //   this.logger.info('Opening the new page...')
    //   const page = await browser.newPage()
    //   this.logger.info('Opening the login page...')
    //   await page.goto('https://plagiarismsearch.com/account/login', { timeout: TIMEOUT_GOTO })
    //   const emailInput = await page.$('[name="login"]')
    //   const passwordInput = await page.$('[name="password"]')
    //   const button = await page.$('.account-submit')
    //   this.logger.info('Submiting the login form...')
    //   await emailInput!.type(userName)
    //   await passwordInput?.type(password)
    //   await button?.click()
    //   this.logger.info('Waiting the navigation...')
    //   await page.waitForNavigation()
    //   this.logger.info('Opening the settings page...')
    //   await page.goto('https://plagiarismsearch.com/account/settings', { timeout: TIMEOUT_GOTO })
    //   this.logger.info('Getting strong elements...')
    //   const strongElements = await page.$$('strong')
    //   const strongContents: string[] = []
    //   for (const strong of strongElements) {
    //     const textContent = await page.evaluate((element) => String(element.textContent), strong)
    //     strongContents.push(textContent)
    //   }
    //   const remainingWordsOrRequestsIndex = 0
    //   const remainingWordsOrRequests = strongContents[remainingWordsOrRequestsIndex]
    //   this.logger.info(`Get remaining words or requests:${remainingWordsOrRequests}`)
    //   const notificationBody = {
    //     topic: Env.get('NTFY_TOPIC_NOTIFICATIONS'),
    //     title: 'Plagiarism Search API Status',
    //     message: `You have ${remainingWordsOrRequests} remaining words or requests`,
    //   }
    //   this.logger.info('Sending notification...')
    //   await Ntfy.sendNotification(notificationBody)
    //   this.logger.success(`PlagiarismSearchInvoiceCronJob - COMPLETED - ${nowDate}`)
    // } catch (error) {
    //   this.logger.error(error)
    // } finally {
    //   this.logger.info('Closing the browser...')
    //   if (browser) {
    //     browser.close()
    //   }
    // }
  }
}
