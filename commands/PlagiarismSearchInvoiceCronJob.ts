import { BaseCommand } from '@adonisjs/core/build/standalone'
import puppeteer from 'puppeteer'

export default class PlagiarismSearchInvoiceCronJob extends BaseCommand {
  public static commandName = 'plagiarism-search-invoice:cron-job'

  public static settings = {
    loadApp: true,
  }

  public async run() {
    const userName = 'gsm2015@outlook.com.br'
    const password = '08081972Ga@'
    const browser = await puppeteer.launch({ headless: true })

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

    const content = await page.content()

    this.logger.success(content)

    await browser.close()
  }
}
