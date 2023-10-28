import DefaultResponse from '@ioc:Utils/DefaultResponse'
import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import OrtographyCorrectionsRepository from '@ioc:Repositories/OrtographyCorrectionRepository'
import BullMQ from '@ioc:Adonis/Addons/BullMQ'
import { QueueNamesEnum, OrtographyCorrectionQueueProps } from 'Contracts/queue'
import CustomException from 'App/Exceptions/CustomException'
import Ortography from '@ioc:ExternalApis/Ortography'
import PDF from '@ioc:Libraries/PDF'
import type { CreateNewCorrectionServiceDto } from 'App/Dtos/Services/OrtographicCorrectionServices/CreateNewCorrectionServiceDto'

const queue = BullMQ.queue<OrtographyCorrectionQueueProps, OrtographyCorrectionQueueProps>(
  QueueNamesEnum.ORTOGRAPHY_CORRECTION
)
export default class CreateNewCorrectionService {
  protected async verifyLanguagesIsValid(text: string) {
    const language = await Ortography.detectLanguage(text)

    return language === 'en'
  }
  protected async sendToQueue(original: string, identifier: string, requesterId: number) {
    await queue.add('ortography-correction', { original, identifier, requesterId })
  }

  public async create({
    original,
    requesterId,
    userProvidedIdentifier,
  }: CreateNewCorrectionServiceDto) {
    const findOrtographyCorrection =
      await OrtographyCorrectionsRepository.findByUserProvidedIdentifier(userProvidedIdentifier)

    if (findOrtographyCorrection) {
      throw new CustomException(
        'Ortography correction with this identifier already registered',
        400
      )
    }

    const originalName = `${userProvidedIdentifier.replace(/\s/g, '')}${cuid()}.${original.extname}`

    await original.move(Application.tmpPath('/uploads/ortographic-correction/originals'), {
      name: originalName,
    })
    const originalUrl = `${Env.get(
      'APP_URL'
    )}/uploads/ortographic-correction/originals/${originalName}`

    const text = await PDF.getText(originalUrl)
    const isCorrectLanguage = await this.verifyLanguagesIsValid(text)

    if (!isCorrectLanguage) {
      throw new CustomException('Invalid language', 400)
    }

    const correction = {
      requesterId,
      userProvidedIdentifier,
      original: originalUrl,
    }

    await OrtographyCorrectionsRepository.create(correction)

    await this.sendToQueue(originalUrl, userProvidedIdentifier, requesterId)

    return await DefaultResponse.success(
      'Your file has been submitted for spelling correction',
      201
    )
  }
}
