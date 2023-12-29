import { Box, Center } from '@chakra-ui/react'
import { ReactNode } from 'react'

const BoxContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Center height="100vh">
      <Box
        width={['100%', '90%', '720px', '960px', '1140px', '1140px']}
        padding={8}
        height="100vh"
      >
        {children}
      </Box>
    </Center>
  )
}

export default BoxContainer
