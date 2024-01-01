import { Button, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MdDeleteOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { deleteStockTrade } from '../../../../../../api/stockTrades'
import CustomModal from '../../../../../../components/CustomModal'

const DeleteStockTradeModal = ({
  strategyId,
  stockTradeId,
}: {
  strategyId: string
  stockTradeId: string
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const mutation = useMutation({
    mutationFn: () => {
      return deleteStockTrade(strategyId, stockTradeId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['options', stockTradeId] })
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
        title="Confirm Deletion of Stock Trade"
        primaryText="Yes, delete it"
        secondaryText="No, go back"
        primaryAction={() => {
          mutation.mutate()
          onClose()
        }}
        bodyElement={
          <>
            Are you sure you want to delete this stock trade?
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

export default DeleteStockTradeModal
