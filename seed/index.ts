
import { Event, EventBooked, EventDetails, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import endOfMonth from 'date-fns/endOfMonth'
import startOfMonth from 'date-fns/startOfMonth'
import omit from 'lodash/omit'
import orderBy from 'lodash/orderBy'
import { RRuleSet, rrulestr } from 'rrule'

const prisma = new PrismaClient()

async function makeAdmin () {
  const hashedPassword = await bcrypt.hash('123456', 10)
  const rootAdmin = await prisma.user.create({
    data: {
      id: userId,
      name: 'Vinicius Barbosa de Medeiros',
      email: 'bmvinicius11@gmail.com',
      type: 'ADMIN',
      password: hashedPassword
    }
  })
  console.log('rootAdmin: ', rootAdmin)
}

async function makeEvent () {
  return prisma.event.create({
    data: {
      id: eventId,
      rule: 'DTSTART:20211014T130000Z\nRRULE:FREQ=DAILY',
      eventDetails: {
        create: {
          title: 'Aula Prof. 1',
          description: 'Tudo intenso',
          duration: 1,
          slots: 40

        }
      },
      space: {
        create: {
          name: 'Academia',
          description: 'Sala de academia',
          clientsPerSlot: 40
        }
      }
    }
  })
}

type EventsWithDetails = Event & {
  eventDetails: EventDetails;
  eventsBooked: (EventBooked & {
    eventDetails: EventDetails;
  })[];
}

const range = [startOfMonth(new Date()), endOfMonth(new Date())]

function mountEventOccurrences (event: EventsWithDetails) {
  const rrule = rrulestr(event.rule)
  const rruleSet = new RRuleSet()

  rruleSet.rrule(rrule)
  event.eventsBooked.forEach(({ date }) => {
    rruleSet.exdate(date)
  })

  const dates = rruleSet.between(range[0], range[1])
  const events = [
    ...dates.map((date) => ({
      id: event.id,
      ...omit(event.eventDetails, 'id'),
      date: date.toISOString()
    })),
    ...event.eventsBooked.map(bookedEvent => ({
      id: bookedEvent.id,
      ...omit(bookedEvent.eventDetails, 'id'),
      date: bookedEvent.date.toISOString()
    }))
  ]
  return events
}

function mountEventsOccurrences (events: EventsWithDetails[]) {
  return orderBy(events.flatMap(mountEventOccurrences), 'date')
}

async function loadOccurrences () {
  const events = await prisma.event.findMany({
    include: {
      eventDetails: true,
      eventsBooked: {
        include: {
          eventDetails: true
        }
      }
    }
  })
  // console.log(events)

  const o = mountEventsOccurrences(events).slice(0, 2)
  console.log('Ocurrences: ', o)
}

const eventId = '43af2649-d33a-46b5-b53a-9f864425c51e'
const userId = '0dda20a5-6147-4572-a8d8-5f580f1b9309'
// '2021-10-14T13:00:00.000Z'
const reservationDate = new Date(Date.UTC(2021, 9, 14, 13))
// console.log(reservationDate)

async function makeReservation (eventId: Event['id'], date: Date) {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId
    },
    include: {
      eventDetails: true
    }
  })

  if (!event) throw new Error('SEm evento')
  const { createdAt, description, duration, slots, title, updatedAt, active } = event.eventDetails

  const ticket = await prisma.ticket.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      bookedEvent: {
        connectOrCreate: {
          where: {
            eventId_date: {
              eventId,
              date
            }
          },
          create: {
            date,
            event: {
              connect: {
                id: eventId
              }
            },
            eventDetails: {
              create: {
                createdAt, description, duration, slots, title, updatedAt, active
              }
            }
          }
        }
      }
    }
  })
  console.log('TICKET: ', ticket)

  return ticket
}

async function main () {
  // await makeAdmin()
  // await makeEvent()
  await loadOccurrences()

  // await makeReservation(eventId, reservationDate)
  // console.log('DEPOIS')

  // await loadOccurrences()

  // console.log(events)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
