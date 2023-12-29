import '@fontsource/ibm-plex-sans'

import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    brand: `'IBM Plex Sans', Inter, sans-serif`,
    heading: `'IBM Plex Sans', Inter, sans-serif`,
    mono: `'IBM Plex Mono', 'SFMono-Regular', Menlo, Monaco, Consolas, monospace`,
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 700,
      },
    },
  },
})
