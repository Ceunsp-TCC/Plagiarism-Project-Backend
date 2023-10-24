import Notifications from 'App/Models/Notifications'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Notifications, () => {
  return {
    message: 'Boas vindas',
    data: {
      navigateTo: 'test',
    },
  }
}).build()
