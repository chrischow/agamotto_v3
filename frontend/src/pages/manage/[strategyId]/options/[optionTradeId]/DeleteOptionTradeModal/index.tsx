import { Button, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MdDeleteOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { deleteOptionTrade } from '../../../../../../api/optionTrades'
import CustomModal from '../../../../../../components/CustomModal'

const DeleteOptionTradeModal = ({
  strategyId,
  optionTradeId,
}: {
  strategyId: string
  optionTradeId: string
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const mutation = useMutation({
    mutationFn: () => {
      return deleteOptionTrade(strategyId, optionTradeId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['options', optionTradeId] })
      navigate(`/manage/${strategyId}`)
    },
  })
  return (
    <>
      <Button
        ml={2}
        leftIcon={<MdDeleteOutline />}
        colorScheme="red"
        onClick={onOpen}
      >
        Delete
      </Button>
      <CustomModal
        modalSize="xl"
        title="Confirm Deletion of Option Trade"
        primaryText="Yes, delete it"
        secondaryText="No, go back"
        primaryAction={() => {
          mutation.mutate()
          onClose()
        }}
        bodyElement={
          <>
            Are you sure you want to delete this option trade? This cannot be
            undone.
          </>
        }
        primaryActionColorScheme="red"
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

export default DeleteOptionTradeModal
