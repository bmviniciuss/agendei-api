import { EventTypeEnum, PrismaClient, RuleSetTypeEnum, UserType } from '@prisma/client'
import bcrypt from 'bcrypt'
import { RRule } from 'rrule'

const prisma = new PrismaClient()
const now = new Date()

async function main () {
  const passwordHash = await bcrypt.hash('123456', 10)
  console.log('Creating Admin')
  await prisma.user.create({
    data: {
      name: 'Admin 1',
      email: 'admin1@gmail.com',
      password: passwordHash,
      type: UserType.ADMIN,
      active: true
    }
  })

  console.log('Create client')
  await prisma.user.create({
    data: {
      name: 'Client 1',
      email: 'client1@gmail.com',
      password: passwordHash,
      type: UserType.CLIENT,
      active: true
    }
  })

  console.log('Create Space')
  const space = await prisma.space.create({
    data: {
      name: 'Space 1',
      description: 'Space 1 Description',
      active: true,
      clientsPerSlot: 40,
      ruleSet: {
        create: {
          type: RuleSetTypeEnum.DAILY,
          limit: 1
        }
      }
    }
  })
  const rule = new RRule({
    freq: RRule.DAILY,
    dtstart: new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0, 0)),
    interval: 1
  })
  console.log('Create Event')
  await prisma.event.create({
    data: {
      rule: rule.toString(),
      space: {
        connect: {
          id: space.id
        }
      },
      eventDetails: {
        create: {
          title: 'Evento 1',
          description: '',
          duration: 1,
          type: EventTypeEnum.BOOKED,
          slots: 40
        }
      }
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
