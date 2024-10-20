import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export const dynamic = 'force-dynamic'

export const GET = async (
  _request: Request,
  { params }: { params: { id: string; eventId: string } },
) => {
  const eventId = params.eventId
  try {
    const tastings = await prisma.tasting.findMany({
      where: { eventId: eventId },
    })

    if (!tastings) {
      return Response.json(
        { success: false, message: 'Tastings not found' },
        { status: 404 },
      )
    }

    return Response.json({ success: true, tastings: tastings }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { success: false, message: 'Failed to get tastings' },
      { status: 500 },
    )
  }
}

export const POST = async (
  request: Request,
  { params }: { params: { id: string; eventId: string } },
) => {
  const eventId = params.eventId
  const clubId = params.id
  const body = await request.json()
  const userEmail = body.userEmail as string
  const wineId = body.wineId as string

  const club = await prisma.wineClub.findUnique({
    where: { id: clubId },
    include: {
      members: true,
    },
  })

  if (!club) {
    return Response.json(
      { success: false, message: 'Club not found' },
      { status: 404 },
    )
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  })
  if (!user) {
    return Response.json(
      { status: false, message: 'User not found' },
      { status: 404 },
    )
  }

  if (
    !club.members.find((member: User) => member.id === user.id) ||
    club.clubOwnerId !== user.id
  ) {
    return Response.json(
      { success: false, message: `User not a member of ${club.name}` },
      {
        status: 403,
      },
    )
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      signUps: true,
    },
  })

  if (!event) {
    return Response.json(
      { success: false, message: `Event not found` },
      {
        status: 404,
      },
    )
  }

  if (
    !event.signUps.find((member: User) => member.id === user.id) &&
    event.hostId !== user.id
  ) {
    return Response.json(
      {
        success: false,
        message: `User ${user.name} not signed up for ${event.name}`,
      },
      {
        status: 403,
      },
    )
  }

  if (event.wineClubId !== clubId) {
    return Response.json(
      {
        success: false,
        message: `Club ${club.name} does not have an called event ${event.name}`,
      },
      {
        status: 403,
      },
    )
  }

  const wine = await prisma.wine.findUnique({
    where: { id: wineId },
  })

  if (!wine) {
    return Response.json(
      {
        success: false,
        message: `Wine not found`,
      },
      {
        status: 404,
      },
    )
  }

  try {
    await prisma.tasting.create({
      data: {
        event: {
          connect: {
            id: event.id,
          },
        },
        wine: {
          connect: {
            id: wine.id,
          },
        },
      },
    })
    return Response.json(
      {
        success: true,
        message: `Tasting of ${wine.name} added to ${event.name}`,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to leave club:', error)
    return Response.json(
      { success: false, message: 'Failed to leave club' },
      { status: 500 },
    )
  }
}
