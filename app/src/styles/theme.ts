import { extendTheme, theme as baseTheme } from '@chakra-ui/react'

export const colors = {
  brandRed: '#4c1c24',
  brandRedDark: '#3b151a',
  brandGray: '#1a1a1a',
  brandLightGray: '#2a2a2a',
  brandWhite: '#E0E0E0',
}

export const theme = extendTheme(
  {
    colors,
  },
  baseTheme,
)
