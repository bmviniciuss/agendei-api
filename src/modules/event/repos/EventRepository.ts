import { Event, EventDetails, EventBooked } from '@prisma/client'

export type EventToOccurence = Event & {
  eventDetails: EventDetails;
  eventsBooked: (EventBooked & {
      eventDetails: EventDetails;
  })[];
}

export interface LoadEventsToOccurrencesRepository {
  loadEventsToOccurrences(spaceIds: string[] | undefined | null): Promise<EventToOccurence[]>
}
