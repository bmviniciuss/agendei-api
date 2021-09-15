export namespace LoginUserErrors {
  export class EmailOrPasswordInvalidError extends Error {
    constructor () {
      super('Email or password is invalid.')
      this.name = 'EmailOrPasswordInvalidError'
    }
  }
}
