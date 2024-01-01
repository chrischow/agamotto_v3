import { Button, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MdDeleteOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { deleteStrategy } from '../../../../api/strategies'
import CustomModal from '../../../../components/CustomModal'

const DeleteStrategyModal = ({ strategyId }: { strategyId: string }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const mutation = useMutation({
    mutationFn: () => {
      return deleteStrategy(strategyId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategies', strategyId] })
      navigate(`/manage`)
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
        title="Confirm Deletion of Strategy"
        primaryText="Yes, delete it"
        secondaryText="No, go back"
        primaryAction={() => {
          mutation.mutate()
          onClose()
        }}
        bodyElement={
          <>
            Are you sure you want to delete this strategy and its constituent
            option and stock trades?
            <br />
            <br />
            This cannot be undone.
          </>
        }
        primaryActionColorScheme="red"
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

export default DeleteStrategyModal
