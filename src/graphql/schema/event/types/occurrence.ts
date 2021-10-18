import { objectType } from 'nexus'

import { GetAvailableSlotsUseCase } from '../../../../modules/event/use-cases/get-available-slots/GetAvailableSlotsUseCase'
import { PrismaBookedEventRepository } from '../../../../modules/ticket/repos/implementations/PrismaBookedEventRepository'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { EventTypeEnumNexus } from './event'

export const OccurenceType = objectType({
  name: 'Occurence',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.id('parentId')
    t.string('title')
    t.string('description')
    t.float('duration')
    t.int('slots')
    t.int('availableSlots', {
      async resolve (root, _args, { prisma }: Context) {
        const bookedEventRepo = new PrismaBookedEventRepository(prisma)
        const useCase = new GetAvailableSlotsUseCase(bookedEventRepo)
        return useCase.execute({
          bookedEventId: root.id,
          eventType: root.type,
          root: root
        })
      }
    })
    t.nonNull.field('type', { type: EventTypeEnumNexus })
    t.nonNull.field('date', { type: 'DateTime' })
    t.boolean('active')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  }
})
