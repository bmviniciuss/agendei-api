import * as Yup from 'yup'
import { pt } from 'yup-locale-pt'

import { Validator } from '../Validator'
import { ValidatorErrors } from '../ValidatorErrors'

export class YupValidatorAdapter implements Validator {
  constructor (private readonly schema: Yup.ObjectSchema<any, any, any, any>) {
    Yup.setLocale(pt)
  }

  validate (input: any): void {
    try {
      this.schema.validateSync(input)
      return
    } catch (error) {
      throw new ValidatorErrors.ValidationError((error as Error).message)
    }
  }
}
