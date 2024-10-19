import '../styles/globals.css'
import { Box, Center } from '@chakra-ui/react'
import { Providers } from './providers'
import { colors } from '@/styles/theme'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='da'>
      <body>
        <Providers>
          <Box
            pt={10}
            minH={'100vh'}
            bg={colors.brandGray}
            color={colors.brandWhite}
          >
            <Center>
              <Box flexDirection={'row'}>{children}</Box>
            </Center>
          </Box>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
