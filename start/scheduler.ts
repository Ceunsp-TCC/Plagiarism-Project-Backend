import Scheduler from '@ioc:Adonis/Addons/Scheduler'

// Scheduler.command('plagiarism-search-invoice:cron-job').everyHours(13)
// Scheduler.command('text-gears-invoice:cron-job').everyHours(12)
Scheduler.command('plagiarism-search-checked:cron-job').everySeconds(20)
