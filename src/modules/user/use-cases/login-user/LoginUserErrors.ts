export namespace LoginUserErrors {
  export class EmailOrPasswordInvalidError extends Error {
    constructor () {
      super('Email ou senha inválido')
      this.name = 'EmailOrPasswordInvalidError'
    }
  }
}
