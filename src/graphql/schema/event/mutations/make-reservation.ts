import { EventTypeEnum, PrismaClient, RuleSetTypeEnum, Ticket, TicketStatus } from '.prisma/client'

import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'
import startOfISOWeek from 'date-fns/startOfISOWeek'
import endOfISOWeek from 'date-fns/endOfISOWeek'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import omit from 'lodash/omit'
import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { TicketNexus } from '../../ticket/types/ticket'
import { EventWithDetails } from '../../../../types'

export const MakeReservationInput = inputObjectType({
  name: 'MakeReservationInput',
  definition (t) {
    t.nonNull.id('parentId')
    t.nonNull.field('date', {
      type: 'DateTime'
    })
  }
})

async function findOrCreateBookedEvent (prisma: PrismaClient, event:EventWithDetails, parentId: string, date: any) {
  return prisma.eventBooked.upsert({
    where: {
      eventId_date: {
        eventId: parentId,
        date
      }
    },
    update: {},
    create: {
      date,
      event: {
        connect: {
          id: parentId
        }
      },
      eventDetails: {
        create: {
          ...omit(event.eventDetails, 'id', 'createdAt', 'updatedAt'),
          type: EventTypeEnum.BOOKED
        }
      }
    },
    include: {
      tickets: {
        select: {
          status: true
        }
      },
      eventDetails: {
        select: {
          slots: true
        }
      }
    }
  })
}

export const MakeReservationMutation = mutationField('MakeReservation', {
  description: 'Allows a CLIENT to reserve a spot on a slot',
  type: TicketNexus,
  args: {
    input: nonNull(arg({
      type: MakeReservationInput
    }))
  },

  async resolve (_, { input }, { currentUser, prisma }: Context) {
    if (!currentUser) throw new Error('Usuário precisa estar logado')

    const ticketStatusFilter = [TicketStatus.RESERVED, TicketStatus.USED]

    const { parentId, date } = input
    console.log('INPUT: ', input)

    const event = await prisma.event.findUnique({
      where: {
        id: parentId
      },
      include: {
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
    })

    if (!event) throw new Error('Evento pai não encontrado.')

    if (event.space.ruleSet) {
      const { ruleSet: spaceRuleSet } = event.space
      const dateToValidate = input.date
      const verificationRangeSlot = (() => {
        switch (spaceRuleSet.type) {
          case RuleSetTypeEnum.DAILY:
            return [startOfDay(dateToValidate), endOfDay(dateToValidate)]
          case RuleSetTypeEnum.WEEKLY:
            return [startOfISOWeek(dateToValidate), endOfISOWeek(dateToValidate)]
          case RuleSetTypeEnum.MONTHLY:
            return [startOfMonth(dateToValidate), endOfMonth(dateToValidate)]
        }
      })()

      const usersTicketFromDateRangeCount = await prisma.ticket.count({
        where: {
          userId: currentUser.id,
          status: {
            in: ticketStatusFilter
          },
          bookedEvent: {
            event: {
              space: {
                id: event.space.id
              }
            },
            date: {
              gte: verificationRangeSlot[0],
              lte: verificationRangeSlot[1]
            }
          }
        }
      })

      if (usersTicketFromDateRangeCount + 1 > spaceRuleSet.limit) {
        throw new Error('Você chegou no limite de tickets')
      }
    }
    // @ts-ignore
    return await prisma.$transaction(async (prismaT: PrismaClient) => {
      /**
       * If date (event occurrence created on the database)
       * doest not exists, creating one (find or create)
       */
      const bookedEvent = await findOrCreateBookedEvent(prismaT, event, parentId, date)
      const bookedEventsTicketsCount = bookedEvent.tickets.filter(({ status }) => {
        return status !== TicketStatus.CANCELED
      }).length

      if (bookedEventsTicketsCount + 1 > bookedEvent.eventDetails.slots) {
        throw new Error('Evento já está cheio')
      }

      return prismaT.ticket.create({
        data: {
          user: {
            connect: {
              id: currentUser.id
            }
          },
          bookedEvent: {
            connect: {
              id: bookedEvent.id
            }
          }
        }
      })
    }) as Ticket
  }
})
