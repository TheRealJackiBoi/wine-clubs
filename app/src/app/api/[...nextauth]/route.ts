// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { authConfig } from '@/auth.config'
import { getUser } from '@/lib/actions' // Adjust the import path as necessary

export const authOptions = {
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await getUser(credentials?.email as string)
        if (
          !user ||
          !(await bcrypt.compare(
            credentials?.password as string,
            user.password,
          ))
        ) {
          return null // Authentication failed
        }

        // Authentication successful, return user
        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Store user information in the token
      if (user) {
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      // Attach user email to session object
      if (token) {
        session.user.email = token.email
      }
      return session
    },
  },
}

// Exporting NextAuth
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
