import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export const dynamic = 'force-dynamic'

export const POST = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const body = await request.json()
  const hostId = body.hostId as string
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
  console.log(hostId)
  const host = await prisma.user.findUnique({
    where: { id: hostId },
  })
  if (!host) {
    console.log('inside')
    return Response.json(
      { status: false, message: 'User not found' },
      { status: 404 },
    )
  }

  if (
    !club.members.find((member: User) => member.id === hostId) &&
    club.clubOwnerId !== hostId
  ) {
    return Response.json(
      { success: false, message: `User not a member of ${club.name}` },
      {
        status: 403,
      },
    )
  }

  try {
    await prisma.event.create({
      data: {
        ...values,
        date: new Date(values.date),
        wineClub: {
          connect: {
            id: club.id,
          },
        },
        host: {
          connect: {
            id: hostId,
          },
        },
      },
    })
    return Response.json(
      { success: true, message: `${values.name} created` },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to create event', error)
    return Response.json(
      { success: false, message: 'Failed to create event' },
      { status: 500 },
    )
  }
}
