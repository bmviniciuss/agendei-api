import { Event, EventDetails, RuleSetTypeEnum, Space } from '@prisma/client'

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

export interface FindEventByParentId {
  findEventByParent(parentId: string): Promise<EventQuery | null>
}
