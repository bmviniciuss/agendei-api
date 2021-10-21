import { PrismaClient } from '.prisma/client'

import {
  EventQuery,
  FindEventByParentId
} from '../EventRepository'

export class PrismaEventRepository implements
FindEventByParentId {
  private eventQueryInclude;

  constructor (private readonly prisma: PrismaClient) {
    this.eventQueryInclude = {
      eventDetails: true,
      space: {
        include: {
          ruleSet: {
            select: {
              type: true,
              limit: true
            }
          }
        }
      }
    }
  }

  findEventByParent (parentId: string): Promise<EventQuery | null> {
    return this.prisma.event.findUnique({
      where: {
        id: parentId
      },
      include: this.eventQueryInclude
    })
  }
}
