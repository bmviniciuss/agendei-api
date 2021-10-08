import endOfDay from 'date-fns/endOfDay'
import startOfDay from 'date-fns/startOfDay'
import { queryField, nonNull } from 'nexus'

import { DayNexus } from '..'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'

export const GetDayQuery = queryField('GetDay', {
  description: '.',
  type: DayNexus,
  args: { date: nonNull('DateTime') },
  resolve (_, { date }, { currentUser, prisma }: Context) {
    const start = startOfDay(date)
    const end = endOfDay(date)

    return prisma.day.findFirst({
      where: {
        date: {
          gte: start,
          lte: end
        }
      }
    })
  }
})
