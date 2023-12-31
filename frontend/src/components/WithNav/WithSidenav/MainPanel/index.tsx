import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

const MainPanel = ({ children }: { children: ReactNode }) => {
  return (
    <Box height="100vh" width="calc(100vw - 310px)" overflowY="scroll">
      <Box py={8} px={12} height="100vh">
        {children}
      </Box>
    </Box>
  )
}

export default MainPanel
