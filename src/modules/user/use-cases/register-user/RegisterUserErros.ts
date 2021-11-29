export namespace RegisterUserErrors {
  export class EmailInUseError extends Error {
    constructor () {
      super('O email já está em uso')
      this.name = 'EmailInUseError'
    }
  }
}
