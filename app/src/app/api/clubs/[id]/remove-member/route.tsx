import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export const dynamic = 'force-dynamic'

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const body = await request.json()
  const userId = body.userId as string

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

  if (!club.members.find((member: User) => member.id === userId)) {
    return Response.json(
      { success: false, message: 'User not a member' },
      {
        status: 403,
      },
    )
  }

  try {
    await prisma.wineClub.update({
      where: { id: club.id },
      data: {
        members: {
          disconnect: {
            id: userId,
          },
        },
      },
    })
    return Response.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Failed to leave club:', error)
    return Response.json(
      { success: false, message: 'Failed to leave club' },
      { status: 500 },
    )
  }
}
