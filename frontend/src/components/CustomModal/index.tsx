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
} from '@chakra-ui/react'
import { ReactElement } from 'react'

const CustomModal = ({
  modalSize = 'lg',
  title,
  primaryText,
  secondaryText,
  primaryAction,
  secondaryAction,
  primaryActionColorScheme = 'purple',
  bodyElement,
  isOpen,
  onClose,
}: {
  modalSize: ResponsiveValue<string>
  title: string
  primaryText: string
  secondaryText: string
  primaryAction: () => void
  secondaryAction?: () => void
  primaryActionColorScheme?: string
  bodyElement: ReactElement
  isOpen: boolean
  onClose: () => void
}) => {
  return (
    <>
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
              colorScheme={primaryActionColorScheme}
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
