import {
  extendTheme,
  ComponentStyleConfig,
  StyleFunctionProps,
} from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#fff',
    800: '#fff',
    700: '#fff',
    600: '#fff',
    500: '#fff',
    400: '#fff',
    300: '#fff',
    200: '#fff',
    100: '#fff',
    50: '#fff',
  },
}

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: 'default',
      bg: props.colorMode === 'dark' ? 'black' : 'white',
    },
  }),
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

// template
// Button: (props: StyleFunctionProps) => ({
// bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
// }),

const components = {
  Button: {
    // 1. We can update the base styles
    baseStyle: (props: StyleFunctionProps) => ({
      // fontWeight: 'bold', // Normally, it is "semibold"
      rounded: 'full',
      border: '1px',
      borderColor: 'white',
      _hover: { bg: 'black', color: 'white' },
    }),
    // 2. We can add a new button size or extend existing
    // sizes: {
    //   xl: {
    //     h: '56px',
    //     fontSize: 'lg',
    //     px: '32px',
    //   },
    // },
    // 3. We can add a new visual variant
    variants: {
      // 'with-shadow': {
      //   bg: 'red.400',
      //   boxShadow: '0 0 2px 2px #efdfde',
      // },
      // 4. We can override existing variants
      // solid: (props: StyleFunctionProps) => ({
      // bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
      // }),
      // 5. We can add responsive variants
      // sm: {
      //   bg: 'teal.500',
      //   fontSize: 'md',
      // },
    },
    // 6. We can overwrite defaultProps
    defaultProps: {
      // size: 'lg', // default is md
      // variant: 'sm', // default is solid
      // colorScheme: 'brand', // default is gray
    },
  },
}

export const theme = extendTheme({ colors, config,  })
