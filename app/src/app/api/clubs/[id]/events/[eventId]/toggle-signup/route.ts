import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export const dynamic = 'force-dynamic'

export const PATCH = async (
  request: Request,
  { params }: { params: { eventId: string } },
) => {
  const body = await request.json()
  const userEmail = body.userEmail as string

  const event = await prisma.event.findUnique({
    where: { id: params.eventId },
    include: {
      signUps: true,
      wineClub: {
        include: {
          members: true,
        },
      },
    },
  })

  if (!event) {
    return Response.json(
      { success: false, message: 'Event not found' },
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

  if (event.hostId === user.id) {
    return Response.json(
      {
        success: false,
        message: `Host can't signUp`,
      },
      {
        status: 403,
      },
    )
  }

  if (
    !event.wineClub.members.find((member: User) => member.id === user.id) &&
    event.wineClub.clubOwnerId !== user.id
  ) {
    return Response.json(
      {
        success: false,
        message: `User not a member of ${event.wineClub.name}`,
      },
      {
        status: 403,
      },
    )
  }

  const isSignedUp = !!event.signUps.find((signUp) => signUp.id === user.id)

  try {
    await prisma.event.update({
      where: { id: event.id },
      data: {
        signUps: {
          ...(isSignedUp
            ? {
                disconnect: { id: user.id },
              }
            : { connect: { id: user.id } }),
        },
      },
    })
    return Response.json(
      {
        success: true,
        message: `You have ${isSignedUp ? 'left' : 'joined'} the event`,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error(
      `Failed to ${isSignedUp ? 'unassign' : 'sign up for'} event:`,
      error,
    )
    return Response.json(
      {
        success: false,
        message: `Failed to ${isSignedUp ? 'unassign' : 'sign up for'} event:`,
      },
      { status: 500 },
    )
  }
}
