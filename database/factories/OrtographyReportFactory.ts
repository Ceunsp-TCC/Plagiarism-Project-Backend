import OrtographyCorrections from 'App/Models/OrtographyCorrections'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(OrtographyCorrections, ({ faker }) => {
  return {
    userProvidedIdentifier: faker.person.fullName(),
    original: 'test',
  }
}).build()
