import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hashSync(
    process.env.ADMIN_PASSWORD as string,
    10,
  )
  const email = 'jack@oulund.dk'

  await prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      email: email,
      name: 'jack',
      password,
      role: 'ADMIN',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
