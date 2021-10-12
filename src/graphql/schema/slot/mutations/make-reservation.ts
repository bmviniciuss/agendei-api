
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
    console.log(input)

    // Verificando se slot existe e pegando valor maximo de tickets permitidos
    const slot = await prisma.slot.findFirst({
      where: {
        id: input.slotId
      },
      select: {
        usersLimit: true
      }
    })

    if (!slot) throw new Error('Slot não existe')

    // Pegar tickets reservados, pois ja usados quer dizer que o ex
    const slotTicketsCount = await prisma.ticket.count({
      where: {
        slotId: input.slotId,
        status: {
          in: ['RESERVED', 'USED']
        }
      }
    })

    if (slotTicketsCount + 1 > slot.usersLimit) {
      throw new Error('Slot já está cheio')
    }

    // TODO: adicionar validação de acordo com regra do estabelecimento

    const hasUserAlredyReservedThisSlot = await prisma.ticket.findFirst({
      where: {
        slotId: input.slotId,
        userId: currentUser!.id
      }
    })
    if (hasUserAlredyReservedThisSlot) throw new Error('Usuário já reservou esse slot')

    return prisma.ticket.create({
      data: {
        status: 'RESERVED',
        user: {
          connect: {
            id: currentUser!.id
          }
        },
        slot: {
          connect: {
            id: input.slotId
          }
        }
      }
    })
  }
})
