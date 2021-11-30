import { isSameDay, endOfDay, startOfDay } from 'date-fns'
import { objectType, list, nonNull, intArg } from 'nexus'

import { PrismaEventRepository } from '../../../../modules/space/repos/implementations/PrismaEventRepository'
import { ListOccurrences } from '../../../../modules/space/useCases/occurrence/listOccurrences/ListOccurrences'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { GetOccurrencesInput, OccurenceType, EventNexus } from '../../event'
import { SpaceRuleSetNexus } from './rule-set'

export const SpaceNexus = objectType({
  name: 'Space',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.nonNull.int('clientsPerSlot')
    t.nonNull.boolean('active')
    t.field('ruleSet', {
      type: SpaceRuleSetNexus,
      async resolve (root, _args, { prisma }:Context) {
        return prisma.spaceRuleSet.findUnique({
          where: {
            spaceId: root.id
          }
        })
      }
    })
    t.field('events', {
      type: list(nonNull(EventNexus)),
      async resolve (root, _args, { prisma }:Context) {
        return prisma.event.findMany({
          where: {
            space: {
              id: root.id
            }
          }
        })
      }
    })
    t.field('occurrences', {
      description: 'Get space events occurrences',
      args: {
        occurrencesInput: nonNull(GetOccurrencesInput)
      },
      type: list(nonNull(OccurenceType)),
      async resolve ({ id }, { occurrencesInput }, { prisma }:Context) {
        const dateRange = (() => {
          const { startTime, endTime } = occurrencesInput
          if (isSameDay(startTime, endTime)) {
            return { startTime: startOfDay(startTime), endTime: endOfDay(endTime) }
          }
          return { startTime, endTime }
        })()

        const eventRepository = new PrismaEventRepository(prisma)
        const useCase = new ListOccurrences(eventRepository)

        return useCase.execute({
          spaceIds: [id],
          dateRange
        })
      }
    })
    t.list.nonNull.field('tickets', {
      type: 'Ticket',
      args: {
        take: intArg()
      },
      async resolve ({ id }, args, { prisma }: Context) {
        return prisma.ticket.findMany({
          where: {
            eventInstance: {
              parent: {
                space: {
                  id: id
                }
              }
            }
          },
          take: args?.take ?? undefined,
          orderBy: {
            createdAt: 'desc'
          }
        })
      }
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})
