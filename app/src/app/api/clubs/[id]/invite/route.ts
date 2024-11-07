import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { DateTime } from 'luxon'

export const dynamic = 'force-dynamic'

export const POST = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const body = await request.json()
  const userId = body.userId as string
  const values = body.values

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
  const host = await prisma.user.findUnique({
    where: { id: userId },
  })
  if (!host) {
    return Response.json(
      { status: false, message: 'User not found' },
      { status: 404 },
    )
  }

  if (
    !club.members.find((member: User) => member.id === userId) &&
    club.clubOwnerId !== userId
  ) {
    return Response.json(
      { success: false, message: `User not a member of ${club.name}` },
      {
        status: 403,
      },
    )
  }

  const userToAdd = await prisma.user.findUnique({
    where: { email: values.email },
  })

  if (!userToAdd) {
    return Response.json(
      { success: false, message: `User to add not found` },
      { status: 404 },
    )
  }

  if (club.members.find((member: User) => member.id === userToAdd.id)) {
    return Response.json(
      { success: false, message: `User is already a member of ${club.name}` },
      {
        status: 403,
      },
    )
  }

  if (club.clubOwnerId === userToAdd.id) {
    return Response.json(
      {
        success: false,
        message: `The user you're trying to add is the owner of ${club.name}`,
      },
      {
        status: 403,
      },
    )
  }

  try {
    await prisma.notification.create({
      data: {
        message: `You have been invited to the club ${club.name}`,
        type: 'INVITATION',
        user: {
          connect: {
            id: userToAdd.id,
          },
        },
        club: {
          connect: {
            id: club.id,
          },
        },
        endDate: DateTime.now().plus({ days: 7 }).toJSDate(),
      },
    })
    return Response.json(
      { success: true, message: `${values.name} invited` },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to invite user', error)
    return Response.json(
      { success: false, message: 'Failed to invite user' },
      { status: 500 },
    )
  }
}
