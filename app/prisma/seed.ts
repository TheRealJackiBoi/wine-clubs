import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = bcrypt.hashSync(
    process.env.ADMIN_PASSWORD as string,
    10,
  )

  // Create or update Jack (club owner)
  const jack = await prisma.user.upsert({
    where: { email: 'jack@oulund.dk' },
    update: {},
    create: {
      email: 'jack@oulund.dk',
      name: 'Jack',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create or update Sander
  const sanderPassword = bcrypt.hashSync('1234', 10)
  const sander = await prisma.user.upsert({
    where: { email: 'sanderroust@gmail.com' },
    update: {},
    create: {
      email: 'sanderroust@gmail.com',
      name: 'Sander',
      password: sanderPassword,
    },
  })

  // Create or update the wine club and connect members
  const wineClub = await prisma.wineClub.upsert({
    where: { name: 'Wine Club' },
    update: {
      members: {
        connect: [
          { id: jack.id }, // Ensure Jack is a member
          { id: sander.id }, // Ensure Sander is a member
        ],
      },
    },
    create: {
      name: 'Wine Club',
      description: 'A club for wine enthusiasts.',
      image:
        'https://static.wixstatic.com/media/06b563_a47b6a3cd40241f6af91cbd3b8dd8e08~mv2.png/v1/fill/w_640,h_682,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/06b563_a47b6a3cd40241f6af91cbd3b8dd8e08~mv2.png',
      clubOwner: { connect: { id: jack.id } },
      members: {
        connect: [
          { id: jack.id }, // Add Jack as a member on creation
          { id: sander.id }, // Add Sander as a member on creation
        ],
      },
    },
  })

  // Check if the event already exists
  const existingEvent = await prisma.event.findFirst({
    where: {
      wineClubId: wineClub.id,
      hostId: sander.id,
      date: {
        gte: new Date(),
      },
    },
  })

  // Create the event if it doesn't exist
  const event =
    existingEvent ||
    (await prisma.event.create({
      data: {
        name: 'Autumn Wine Tasting',
        description: 'A tasting event for our autumn selection.',
        wineClub: { connect: { id: wineClub.id } },
        host: { connect: { id: sander.id } },
        location: 'Wine Cellar',
        date: new Date(),
      },
    }))

  // Create or update the wine
  const wine = await prisma.wine.upsert({
    where: { name: 'Château Margaux 2015' },
    update: {},
    create: {
      name: 'Château Margaux 2015',
      image:
        'https://www.tastings.com/Product-Images/Wine/2022/12_18_2022/245544_z.jpg',
      year: new Date('2015-01-01'),
    },
  })

  // Create the tasting for the event and the wine
  await prisma.tasting.create({
    data: {
      wine: { connect: { id: wine.id } },
      event: { connect: { id: event.id } },
    },
  })

  console.log('Seeding complete')
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
