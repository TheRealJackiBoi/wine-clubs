import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { authConfig } from './auth.config'

import { Credentials as CredentialsType } from '@/lib/definitions'
import { getUser } from '@/lib/actions'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials: CredentialsType) {
        const user = await getUser(credentials.email as string)

        if (!user) {
          return null
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password,
        )
        if (passwordsMatch) {
          return user
        }

        return null
      },
    }),
  ],
})
