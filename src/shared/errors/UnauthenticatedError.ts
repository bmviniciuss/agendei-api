export class UnauthenticatedError extends Error {
  constructor () {
    super('Você não está autenticado para realizar essa ação')
    this.name = 'UnauthenticatedError'
  }
}
