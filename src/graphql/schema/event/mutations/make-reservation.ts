import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { TicketNexus } from '../../ticket/types/ticket'

export const MakeReservationInput = inputObjectType({
  name: 'MakeReservationInput',
  definition (t) {
    t.nonNull.id('slotId')
  }
})

export const MakeReservationMutation = mutationField('MakeReservation', {
  description: 'Allows a CLIENT to reserve a spot on a slot',
  type: TicketNexus,
  args: {
    input: nonNull(arg({
      type: MakeReservationInput
    }))
  },

  async resolve (_, { input }, { currentUser, prisma }: Context) {
    return null
    // const { slotId } = input
    // const ticketStatusFilter = [TicketStatus.RESERVED, TicketStatus.USED]

    // // Get slot and associated space
    // const slot = await prisma.slot.findFirst({
    //   where: {
    //     id: slotId
    //   },
    //   include: {
    //     space: {
    //       include: {
    //         ruleSet: true
    //       }
    //     }
    //   }
    // })

    // if (!slot) throw new Error('Slot não existe')

    // const hasUserAlredyReservedThisSlot = await prisma.ticket.findFirst({
    //   where: {
    //     slotId: input.slotId,
    //     userId: currentUser!.id
    //   }
    // })

    // if (hasUserAlredyReservedThisSlot) throw new Error('O usuário já tem um ticket desse slot')

    // // Pegar tickets reservados, pois ja usados quer dizer que o ex
    // const slotTicketsCount = await prisma.ticket.count({
    //   where: {
    //     slotId: input.slotId,
    //     status: {
    //       in: ticketStatusFilter
    //     }
    //   }
    // })

    // if (slotTicketsCount + 1 > slot.numberOfClientsLimit) {
    //   throw new Error('Slot já está cheio')
    // }

    // // se tenho rule set, vou verificar se posso criar o ticket
    // if (slot?.space?.ruleSet) {
    //   const { type, limit } = slot.space.ruleSet
    //   const { startTime: slotStartTime } = slot
    //   const verificationRangeSlot = (() => {
    //     switch (type) {
    //       case RuleSetTypeEnum.DAILY:
    //         return [startOfDay(slotStartTime), endOfDay(slotStartTime)]
    //       case RuleSetTypeEnum.WEEKLY:
    //         return [startOfISOWeek(slotStartTime), endOfISOWeek(slotStartTime)]
    //       case RuleSetTypeEnum.MONTHLY:
    //         return [startOfMonth(slotStartTime), endOfMonth(slotStartTime)]
    //     }
    //   })()
    //   const usersTicketFromRangeCount = await prisma.ticket.count({
    //     where: {
    //       userId: currentUser?.id,
    //       status: {
    //         in: ticketStatusFilter
    //       },
    //       slot: {
    //         startTime: {
    //           gte: verificationRangeSlot[0],
    //           lte: verificationRangeSlot[1]
    //         }
    //       }
    //     }
    //   })

    //   if (usersTicketFromRangeCount + 1 > limit) throw new Error('Você chegou no limite de tickets')
    // }

    // return prisma.ticket.create({
    //   data: {
    //     status: TicketStatus.RESERVED,
    //     user: {
    //       connect: {
    //         id: currentUser!.id
    //       }
    //     },
    //     slot: {
    //       connect: {
    //         id: input.slotId
    //       }
    //     }
    //   }
    // })
  }
})
