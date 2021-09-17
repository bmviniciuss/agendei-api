import Joi from 'joi'

import { Validator } from '../Validator'
import { ValidatorErrors } from '../ValidatorErrors'

export class JoiValidatorAdapter implements Validator {
  constructor (private readonly schema: Joi.ObjectSchema) {}

  validate (input: any): void {
    const validation = this.schema.validate(input)
    if (validation.error) {
      throw new ValidatorErrors.ValidationError(validation.error.message)
    }
  }
}
