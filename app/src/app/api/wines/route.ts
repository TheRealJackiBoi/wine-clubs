import prisma from '@/lib/prisma'
import { DateTime } from 'luxon'

export const dynamic = 'force-dynamic'

export const GET = async (_requeset: Request) => {
  try {
    const wines = await prisma.wine.findMany()
    return Response.json({ success: true, wines: wines }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json({ success: false, message: error }, { status: 500 })
  }
}

export const POST = async (request: Request) => {
  const body = await request.json()
  const values = await body.values
  console.log(values)

  const isExistingWine = await prisma.wine.findUnique({
    where: { name: values.name },
  })

  if (isExistingWine) {
    return Response.json(
      { success: false, message: 'Wine already exists' },
      { status: 400 },
    )
  }

  const date = DateTime.fromObject({
    year: parseInt(values.year),
    month: 1,
    day: 1,
  })

  try {
    await prisma.wine.create({
      data: {
        ...values,
        year: date.toJSDate(),
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
