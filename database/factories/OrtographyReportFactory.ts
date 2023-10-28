import OrtographyCorrections from 'App/Models/OrtographyCorrections'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(OrtographyCorrections, () => {
  return {
    userProvidedIdentifier: 'test',
    original: 'test',
  }
}).build()
