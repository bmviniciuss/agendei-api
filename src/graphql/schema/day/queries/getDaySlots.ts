import endOfDay from 'date-fns/endOfDay'
import formatISO from 'date-fns/formatISO'
import startOfDay from 'date-fns/startOfDay'
import { queryField } from 'nexus'

import { DayNexus } from '..'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'

export const getDaySlots = queryField('getDay', {
  description: '.',
  type: DayNexus,
  resolve (_, __, { currentUser, prisma }: Context) {
    console.log('date', new Date())
    console.log('date iso', new Date().toISOString())
    console.log('fns iso', formatISO(new Date()))
    return prisma.day.findFirst({
      where: {
        date: {
          gte: startOfDay(new Date()),
          lte: endOfDay(new Date())
        }
      }
    })
  }
})
