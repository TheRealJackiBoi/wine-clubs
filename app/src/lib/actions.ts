'use server'

import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { signIn } from '@/auth'
import { Credentials } from '@/lib/definitions'

export async function authenticate(
  _prevState: string | undefined,
  data: Credentials,
) {
  try {
    await signIn('credentials', { ...data, callbackUrl: '/protected-page' })
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialsSignin'
    }
    throw error
  }
}

export const signup = async (
  _prevState: string | undefined,
  data: Credentials,
) => {
  try {
    const user = await getUser(data.email!)
    if (user) {
      throw new Error('User already exists')
    }
    data.password = await bcrypt.hash(data.password!, 10)
    await prisma.user.create({
      data: {
        name: data.name!,
        email: data.email!,
        password: data.password!,
        avatar: data.avatar,
      },
    })
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignup')) {
      return 'CredentialsSignup'
    }
    throw error
  }
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  })
}

export async function getUserClubs(userId: string) {
  return prisma.wineClub.findMany({
    where: {
      OR: [{ members: { some: { id: userId } } }, { clubOwnerId: userId }],
    },
    include: {
      members: true,
      clubOwner: true,
    },
  })
}

export async function getUserEvents(userId: string) {
  return prisma.event.findMany({
    where: {
      OR: [{ signUps: { some: { id: userId } } }, { hostId: userId }],
    },
    include: {
      wineClub: true,
    },
  })
}

export async function getUser(email: string): Promise<User | null> {
  try {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    })
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export async function getAllUsers() {
  try {
    return await prisma.user.findMany()
  } catch (error) {
    console.error('Failed to fetch users:', error)
    throw new Error('Failed to fetch users.')
  }
}

export const getAllClubs = async () => {
  try {
    return await prisma.wineClub.findMany({
      include: {
        members: true,
        clubOwner: true,
      },
    })
  } catch (error) {
    console.error('Failed to fetch clubs:', error)
    throw new Error('Failed to fetch clubs.')
  }
}
