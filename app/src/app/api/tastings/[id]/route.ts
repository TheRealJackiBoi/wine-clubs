import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params.id
  try {
    const tasting = await prisma.tasting.findUnique({
      where: { id: id },
    })

    if (!tasting) {
      return Response.json(
        { success: false, message: 'Tasting not found' },
        { status: 404 },
      )
    }

    return Response.json({ success: true, tasting: tasting }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { success: false, message: 'Failed to get tasting' },
      { status: 500 },
    )
  }
}
