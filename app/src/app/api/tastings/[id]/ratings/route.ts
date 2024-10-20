import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export const POST = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const tastingId = params.id
  const body = await request.json()
  const userEmail = body.userEmail as string
  const rating = parseInt(body.rating)

  const tasting = await prisma.tasting.findUnique({
    where: { id: tastingId },
    include: {
      wine: true,
      event: {
        include: {
          host: true,
          signUps: true,
        },
      },
    },
  })

  if (!tasting) {
    return Response.json(
      { status: false, message: 'Tasting not found' },
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
    tasting.event.host.id !== user.id &&
    !tasting.event.signUps.find((signUp) => signUp.id === user.id)
  ) {
    return Response.json(
      {
        status: false,
        message: `User ${user.name} is not a part of event ${tasting.event.name}`,
      },
      { status: 404 },
    )
  }

  try {
    await prisma.rating.create({
      data: {
        rating: rating,
        tasting: {
          connect: {
            id: tasting.id,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })
    return Response.json(
      {
        success: true,
        message: `Rating of ${tasting.wine.name} added`,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to rate wine:', error)
    return Response.json(
      { success: false, message: 'Failed to rate wine' },
      { status: 500 },
    )
  }
}
