import { EventTypeEnum } from '.prisma/client'

import { omit, orderBy } from 'lodash'
import { RRuleSet, rrulestr } from 'rrule'

import { UseCase } from '../../../../shared/core/UseCase'
import { EventBookedWithDetails, EventInstanceWithEventDetails, EventWithDetails, EventWithDetailsAndBookedEvents, Occurrence, TimeRange } from '../../../../types'
import { LoadEventsToOccurrencesRepository } from '../../repos/EventRepository'
import { GetOccurrencesDTO } from './GetOccurrencesDTO'

export type GetOccurrencesUseCaseResult = Occurrence[]

export class GetOccurrencesUseCase implements UseCase<GetOccurrencesDTO, GetOccurrencesUseCaseResult> {
  constructor (
    private readonly loadEventsToOccurrencesRepository: LoadEventsToOccurrencesRepository
  ) { }

  async execute (data: GetOccurrencesDTO): Promise<GetOccurrencesUseCaseResult> {
    const events = await this.loadEventsToOccurrencesRepository.loadEventsToOccurrences(undefined)
    return this._mountEventsOccurrences(events, data.dateRange)
  }

  private _mountEventsOccurrences (events: EventWithDetailsAndBookedEvents[], range: TimeRange) {
    const allOccurrencesAndConcreteEvents = events.flatMap(
      (event) => this._mountEventOccurrences(event, range)
    )
    return orderBy(allOccurrencesAndConcreteEvents, 'date')
  }

  private _mountEventOccurrences (event: EventWithDetailsAndBookedEvents, range: TimeRange): Occurrence[] {
    const rruleSet = new RRuleSet()
    const rrule = rrulestr(event.rule)
    rruleSet.rrule(rrule)

    // removing events instances from occurences (virtual objects), because its a instace on database
    event.eventsInstances.forEach(({ date }) => {
      rruleSet.exdate(date)
    })

    const occurencesDates = rruleSet.between(range.startTime, range.endTime)
    return [
      ...this._buildVirtualOccurrences(event, occurencesDates),
      ...this._buildConcreteOccurences(event)
    ]
  }

  private _buildVirtualOccurrences (event: EventWithDetails, dates: Date[]): Occurrence[] {
    return dates.map((date) => ({
      ...this._mapEventDetails(event),
      id: event.id,
      parentId: event.id,
      type: EventTypeEnum.OCCURRENCE,
      date: date.toISOString()
    }))
  }

  private _buildConcreteOccurences (event: EventWithDetailsAndBookedEvents): Occurrence[] {
    return event.eventsInstances.map(eventInstance => ({
      ...this._mapEventDetails(eventInstance),
      id: eventInstance.id,
      parentId: eventInstance.parentId,
      type: EventTypeEnum.BOOKED,
      date: eventInstance.date.toISOString()
    }))
  }

  private _mapEventDetails (e: EventWithDetails | EventBookedWithDetails | EventInstanceWithEventDetails) {
    return {
      ...omit(e.eventDetails, 'id', 'type')
    }
  }
}
