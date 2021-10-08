import { Day } from '.prisma/client'

export type CreateDayDTO = Pick<Day, 'date'>
