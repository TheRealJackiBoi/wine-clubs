import prisma from '@/lib/prisma'
import { NotificationType, User } from '@prisma/client'

export const dynamic = 'force-dynamic'

export const POST = async (
  request: Request,
  { params }: { params: { id: string; inviteId: string } },
) => {
  const body = await request.json()
  const userId = body.userId as string
  const notificationId = params.inviteId

  const club = await prisma.wineClub.findUnique({
    where: { id: params.id },
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
    where: { id: userId },
  })
  if (!user) {
    return Response.json(
      { status: false, message: 'User not found' },
      { status: 404 },
    )
  }

  if (
    club.members.find((member: User) => member.id === userId) &&
    club.clubOwnerId !== userId
  ) {
    return Response.json(
      { success: false, message: `User is a member of ${club.name}` },
      {
        status: 403,
      },
    )
  }

  const notification = await prisma.notification.findUnique({
    where: {
      id: notificationId,
    },
  })

  if (!notification) {
    return Response.json(
      { status: false, message: 'Notification not found' },
      { status: 404 },
    )
  }

  if (notification.type !== NotificationType.INVITATION) {
    return Response.json(
      { status: false, message: 'Notification is not an invitation' },
      { status: 403 },
    )
  }

  if (club.id !== notification.clubId) {
    return Response.json(
      { status: false, message: `Notification not connected to ${club.name}` },
      { status: 403 },
    )
  }

  try {
    await prisma.wineClub.update({
      where: {
        id: club.id,
      },
      data: {
        members: {
          connect: {
            id: user.id,
          },
        },
      },
    })
    return Response.json(
      { success: true, message: `Joined ${club.name}` },
      { status: 200 },
    )
  } catch (error) {
    console.error(`Failed to join club`, error)
    return Response.json(
      { success: false, message: 'Failed to join club' },
      { status: 500 },
    )
  }
}
