import Joi from 'joi'

import { Validator } from '../Validator'
import { JoiValidatorAdapter } from './JoiValidatorAdapter'

export class JoiValidatorAdapterFactory {
  constructor (private readonly jsonSchema: Joi.ObjectSchema) {}

  build (): Validator {
    return new JoiValidatorAdapter(this.jsonSchema)
  }
}
