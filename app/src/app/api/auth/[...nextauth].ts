import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // Add your Google Client ID here
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Add your Google Client Secret here
    }),
  ],
  pages: {
    signIn: '/auth/login', // Custom login page
    // You can also add a signUp page here if needed:
    // signUp: '/auth/signup',
  },
}

export default NextAuth(authOptions)
