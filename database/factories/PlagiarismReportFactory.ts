import PlagiarismReport from 'App/Models/PlagiarismReport'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(PlagiarismReport, () => {
  return {
    externalId: 10000,
    academicPaperId: 1,
    requesterId: 1,
  }
}).build()
