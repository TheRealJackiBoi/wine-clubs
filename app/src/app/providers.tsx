'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <SessionProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </SessionProvider>
    </CacheProvider>
  )
}
