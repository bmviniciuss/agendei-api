export namespace MakeReservationErrors {
  export class PastDateReservationError extends Error {
    constructor () {
      super('Não é possível realizar o agendamento em um evento no passado')
      this.name = 'PastDateReservationError'
    }
  }

  export class NoParentEventFound extends Error {
    constructor () {
      super('Evento não existe')
      this.name = 'NoParentEventFound'
    }
  }

  export class UserSpaceTicketsLimitError extends Error {
    constructor () {
      super('Usuário atingiu o limite de tickets do espaço')
      this.name = 'UserSpaceTicketsLimitError'
    }
  }

  export class EventIsFullError extends Error {
    constructor () {
      super('O Evento atingiu a quantidade máxima de tickets')
      this.name = 'EventIsFullError'
    }
  }
}
