import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { IoMdSpeedometer } from 'react-icons/io'
import { MdOutlineDashboard, MdOutlineListAlt } from 'react-icons/md'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'

import Brand from '../../../Brand'
import SidenavLink from '../../../SidenavLink'

const NavLogo = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate()

  return (
    <HStack
      m={4}
      alignItems="center"
      userSelect="none"
      onClick={() => {
        navigate('/')
        onClose()
      }}
      _hover={{ cursor: 'pointer' }}
    >
      <Brand fontSize="larger" />
    </HStack>
  )
}

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <HStack
        position="absolute"
        alignItems="center"
        py={[4, 8]}
        px={[4, 12]}
        height={['50px', '60px']}
        bg="gray.100"
        width="100%"
      >
        <IconButton
          icon={<RxHamburgerMenu />}
          aria-label="Menu"
          onClick={onOpen}
        />
        <NavLogo onClose={onClose} />
      </HStack>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <NavLogo onClose={onClose} />
          </DrawerHeader>
          <DrawerBody>
            <VStack mt={4} alignItems="start">
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
            </VStack>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navbar
