import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

export const theme = extendTheme({ colors, config })
