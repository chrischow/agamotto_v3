import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactElement } from 'react'

const Providers = ({ children }: { children?: ReactElement }) => {
  const queryClient = new QueryClient()

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ChakraProvider>
  )
}

export default Providers
