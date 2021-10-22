import { objectType } from 'nexus'

import { GetAvailableSlotsUseCase } from '../../../../modules/space/useCases/eventInstance/getAvailableSlots/GetAvailableSlotsUseCase'
import { PrismaEventInstanceRepository } from '../../../../modules/ticket/repos/implementations/PrismaEventInstanceRepository'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { EventTypeEnumNexus } from './event'

export const OccurenceType = objectType({
  name: 'Occurrence',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.id('parentId')
    t.string('title')
    t.string('description')
    t.float('duration')
    t.int('slots')
    t.int('availableSlots', {
      async resolve (root, _args, { prisma }: Context) {
        const eventInstanceRepo = new PrismaEventInstanceRepository(prisma)
        const useCase = new GetAvailableSlotsUseCase(eventInstanceRepo)
        return useCase.execute({
          bookedEventId: root.id,
          eventType: root.type,
          root: root
        })
      }
    })
    t.nonNull.boolean('isParentEvent')
    t.nonNull.boolean('isCanceled')
    t.nonNull.boolean('isRescheduled')
    t.nonNull.field('type', { type: EventTypeEnumNexus })
    t.nonNull.field('date', { type: 'DateTime' })
    t.boolean('active')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  }
})
