import { Event, EventDetails, EventBooked, RuleSetTypeEnum, Space } from '@prisma/client'

export type EventToOccurence = Event & {
  eventDetails: EventDetails;
  eventsBooked: (EventBooked & {
      eventDetails: EventDetails;
  })[];
}

export type EventSpaceRuleSetResume = {
  type: RuleSetTypeEnum;
  limit: number;
} | null

export type EventSpace = Space & {
  ruleSet: EventSpaceRuleSetResume;
};

export type EventQuery = Event & {
  eventDetails: EventDetails;
  space: EventSpace
}

export interface LoadEventsToOccurrencesRepository {
  loadEventsToOccurrences(spaceIds: string[] | undefined | null): Promise<EventToOccurence[]>
}

export interface FindEventByParentId {
  findEventByParent(parentId: string): Promise<EventQuery | null>
}
