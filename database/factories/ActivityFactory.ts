import Activities from 'App/Models/Activities'
import Factory from '@ioc:Adonis/Lucid/Factory'

//@ts-ignore
export default Factory.define(Activities, ({ faker }) => {
  return {
    lessonId: 1,
    title: 'title test',
    type: 'ACADEMICPAPER',
    comments: 'test',
  }
}).build()
