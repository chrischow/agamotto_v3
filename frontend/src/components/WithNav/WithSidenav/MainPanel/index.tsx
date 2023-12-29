import { Box, Center } from '@chakra-ui/react'
import { ReactNode } from 'react'

const MainPanel = ({ children }: { children: ReactNode }) => {
  return (
    <Center height="100vh">
      <Box padding={8} height="100vh">
        {children}
      </Box>
    </Center>
  )
}

export default MainPanel
