import Scheduler from '@ioc:Adonis/Addons/Scheduler'

Scheduler.command('plagiarism-search-invoice:cron-job').everyHours(1)
