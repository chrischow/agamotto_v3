import { Button, HStack, Spacer, VStack } from '@chakra-ui/react'
import { IoMdSpeedometer } from 'react-icons/io'
import {
  MdOutlineDashboard,
  MdOutlineListAlt,
  MdOutlineLogout,
} from 'react-icons/md'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAuth } from '../../../context/auth-context'
import Brand from '../../Brand'
import SidenavLink from '../../SidenavLink'
import MainPanel from './MainPanel'

const WithSidenav = () => {
  const navigate = useNavigate()
  const authContext = useAuth()

  return (
    <HStack height="100vh" width="100vw">
      <VStack
        height="100%"
        width="300px"
        alignItems="start"
        p={8}
        backgroundColor="gray.50"
      >
        <Brand ml={6} fontSize="x-large" />
        <VStack mt={6} height="100%" width="100%" alignItems="start" gap={4}>
          <SidenavLink
            icon={<MdOutlineDashboard />}
            route=""
            linkText="Dashboard"
          />
          <SidenavLink
            icon={<IoMdSpeedometer />}
            route="monitor"
            linkText="Monitor"
          />
          <SidenavLink
            icon={<MdOutlineListAlt />}
            route="manage"
            linkText="Manage"
          />
          <Spacer />
          <Button
            width="100%"
            size={['sm', 'md']}
            leftIcon={<MdOutlineLogout />}
            onClick={() => {
              authContext.logout()
              navigate('/login')
            }}
            variant="ghost"
            justifyContent="start"
          >
            Logout
          </Button>
        </VStack>
      </VStack>
      <MainPanel>
        <Outlet />
      </MainPanel>
    </HStack>
  )
}

export default WithSidenav
