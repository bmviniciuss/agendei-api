import { objectType, list, nonNull } from 'nexus'

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
        const eventRepository = new PrismaEventRepository(prisma)
        const useCase = new ListOccurrences(eventRepository)
        return useCase.execute({
          spaceIds: [id],
          dateRange: {
            startTime: occurrencesInput.startTime,
            endTime: occurrencesInput.endTime
          }
        })
      }
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})
