import { Kbd, MenuItem, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'date-fns'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CreateStockTradeDto } from '../../../../../../../api/src/dto/stock-trade.dto'
import { createStockTrade } from '../../../../../api/stockTrades'
import CustomModal from '../../../../../components/CustomModal'
import StockTradeForm from '../../../../../components/StockTradeForm'

const StockTradeMenuItem = ({
  strategyId,
  activateTab,
}: {
  strategyId: string
  activateTab: () => void
}) => {
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Form control
  const { register, handleSubmit, setValue, reset } =
    useForm<CreateStockTradeDto>()

  const mutation = useMutation({
    mutationFn: (dto: CreateStockTradeDto) => {
      return createStockTrade(strategyId, dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategies', strategyId] })
    },
  })
  const onSubmit: SubmitHandler<CreateStockTradeDto> = (data) => {
    const amendedData = { ...data }
    const { quantity, openDate, closeDate } = data
    // Fill in position
    const position = data.position ?? (quantity < 0 ? 'SHORT' : 'LONG')
    console.log(position)
    amendedData.quantity = Math.abs(quantity)
    amendedData.position = position

    // Format dates
    amendedData.openDate = parse(
      openDate,
      'yyyy-MM-dd',
      new Date(),
    ).toISOString()
    if (closeDate) {
      amendedData.closeDate = parse(
        closeDate,
        'yyyy-MM-dd',
        new Date(),
      ).toISOString()
    }

    mutation.mutate(amendedData)
  }

  return (
    <>
      <MenuItem onClick={onOpen}>
        Stock Trade <Kbd ml={2}>S</Kbd>
      </MenuItem>
      <CustomModal
        modalSize="xl"
        title="New Stock Trade"
        primaryText="Create"
        secondaryText="Cancel"
        secondaryAction={() => {
          onClose()
          reset()
        }}
        primaryAction={() => {
          handleSubmit(onSubmit)()
          reset()
          activateTab()
        }}
        isOpen={isOpen}
        onClose={onClose}
        bodyElement={
          <StockTradeForm registerFn={register} setValue={setValue} />
        }
      />
    </>
  )
}

export default StockTradeMenuItem
