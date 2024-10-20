import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const pathname = nextUrl.pathname
      const isLoggedIn = !!auth?.user
      const isOnProtectedPage = nextUrl.pathname.startsWith('/clubs')
      const isSignupPage = pathname.startsWith('/signup')

      if (isLoggedIn && pathname.startsWith('/login')) {
        return Response.redirect(new URL('/', nextUrl))
      }

      if (isOnProtectedPage && !isSignupPage) {
        if (isLoggedIn) return true
        return false
      }

      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.email = user.email
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.email = token.email
      }
      return session
    },
  },
} satisfies NextAuthConfig
