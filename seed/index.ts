
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main () {
  const hashedPassword = await bcrypt.hash('123456', 10)
  const rootAdmin = await prisma.user.create({
    data: {
      name: 'Vinicius Barbosa de Medeiros',
      email: 'bmvinicius11@gmail.com',
      type: 'ADMIN',
      password: hashedPassword
    }
  })
  console.log('rootAdmin: ', rootAdmin)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
