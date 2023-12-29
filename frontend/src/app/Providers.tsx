import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactElement } from 'react'

import { AuthProvider } from '../context/auth-context'
import { theme } from '../theme/theme'

const Providers = ({ children }: { children?: ReactElement }) => {
  const queryClient = new QueryClient()

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default Providers
