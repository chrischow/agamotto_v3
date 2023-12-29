import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ResponsiveValue,
  useDisclosure,
} from '@chakra-ui/react'
import { ReactElement } from 'react'

const CustomModal = ({
  modalSize = 'lg',
  openButtonText,
  openButtonColorScheme,
  openButtonVariant,
  leftIcon,
  title,
  primaryText,
  secondaryText,
  primaryAction,
  secondaryAction,
  bodyElement,
}: {
  modalSize: ResponsiveValue<string>
  openButtonText: string
  openButtonColorScheme: string
  openButtonVariant: ResponsiveValue<string>
  leftIcon: ReactElement
  title: string
  primaryText: string
  secondaryText: string
  primaryAction: () => void
  secondaryAction?: () => void
  bodyElement: ReactElement
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        leftIcon={leftIcon}
        onClick={onOpen}
        colorScheme={openButtonColorScheme}
        variant={openButtonVariant}
      >
        {openButtonText}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{bodyElement}</ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              variant="ghost"
              onClick={() => {
                onClose()
                if (secondaryAction) {
                  secondaryAction()
                }
              }}
            >
              {secondaryText}
            </Button>
            <Button
              colorScheme="purple"
              onClick={() => {
                onClose()
                primaryAction()
              }}
            >
              {primaryText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CustomModal
