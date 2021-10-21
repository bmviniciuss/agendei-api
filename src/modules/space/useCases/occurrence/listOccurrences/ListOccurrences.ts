import { EventTypeEnum } from '.prisma/client'

import { omit, orderBy } from 'lodash'
import { RRuleSet, rrulestr } from 'rrule'

import { UseCase } from '../../../../../shared/core/UseCase'
import { TimeRange, Occurrence, EventWithDetails, EventBookedWithDetails, EventInstanceWithEventDetails } from '../../../../../types'
import { DomainEventWithEventsInstaces } from '../../../domain/EventWithInstance'
import { DomainOccurrence } from '../../../domain/Occurrence'
import { IEventRepository } from '../../../repos/IEventRepository'
import { ListOccurrencesDTO } from './ListOccurrencesDTO'

export class ListOccurrences implements UseCase<ListOccurrencesDTO, DomainOccurrence[]> {
  constructor (
    private readonly eventRepository: IEventRepository
  ) { }

  async execute (data: ListOccurrencesDTO): Promise< DomainOccurrence[]> {
    const events = await this.eventRepository.listSpaceEventsWithInstances(data.spaceIds)
    return this._mountEventsOccurrences(events, data.dateRange)
  }

  private _mountEventsOccurrences (events: DomainEventWithEventsInstaces[], range: TimeRange) {
    const allOccurrencesAndConcreteEvents = events.flatMap(
      (event) => this._mountEventOccurrences(event, range)
    )
    return orderBy(allOccurrencesAndConcreteEvents, 'date')
  }

  private _mountEventOccurrences (event: DomainEventWithEventsInstaces, range: TimeRange): Occurrence[] {
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

  private _buildConcreteOccurences (event: DomainEventWithEventsInstaces): Occurrence[] {
    return event.eventsInstances.map(eventInstance => {
      const type: EventTypeEnum = (() => {
        if (eventInstance.isCanceled) return EventTypeEnum.CANCELED
        else if (eventInstance.isRescheduled) return EventTypeEnum.EXCEPTION
        return EventTypeEnum.BOOKED
      })()

      const date: string = (() => {
        if (eventInstance.isRescheduled) return eventInstance.rescheduledDate!.toISOString()
        return eventInstance.date.toISOString()
      })()

      return {
        ...this._mapEventDetails(eventInstance),
        id: eventInstance.id,
        parentId: eventInstance.parentId,
        type,
        date
      }
    })
  }

  private _mapEventDetails (e: EventWithDetails | EventBookedWithDetails | EventInstanceWithEventDetails) {
    return {
      ...omit(e.eventDetails, 'id', 'type')
    }
  }
}
