'use server'

import { auth } from '@/auth'
import { ClubCreateFormInput } from '@/lib/definitions'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function createClub(
  _prevState: string | undefined,
  data: ClubCreateFormInput,
) {
  const session = await auth()

  if (!session || !session.user || !session.user.email) {
    redirect('/login')
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })
    if (!user) {
      return "Couldn't create club with invalid email."
    }
    const club = await prisma.wineClub.create({
      data: {
        name: data.name,
        description: data.description,
        image: data.imageurl,
        clubOwner: {
          connect: {
            id: user.id,
          },
        },
      },
    })
    console.log(club)
    redirect('/clubs')
  } catch (error) {
    console.error('Failed to create club:', error)
    return 'Failed to create club.'
  }
}
