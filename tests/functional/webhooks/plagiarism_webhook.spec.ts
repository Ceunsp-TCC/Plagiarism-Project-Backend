import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import PlagiarismReportFactory from 'Database/factories/PlagiarismReportFactory'
import ActivityFactory from 'Database/factories/ActivityFactory'
import AcademicPaperFactory from 'Database/factories/AcademicPaperFactory'

const url = '/v1/webhooks/plagiarism'

test.group('Webhook plagiarism', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be receive webhook with success', async ({ client }) => {
    const activity = await ActivityFactory.create()
    const academicPaper = await AcademicPaperFactory.merge({ activityId: activity.id }).create()
    await PlagiarismReportFactory.merge({ academicPaperId: academicPaper.id }).create()
    const body = {
      id: 10000,
      plagiarism: 32.46,
      ai_probability: 32.46,
      status: 2,
    }
    const sut = await client.post(url).json(body)

    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'Webhook received and processed successfully' })
  })
})
