import { Kbd, MenuItem, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'date-fns'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CreateStockTradeDto } from '../../../../../../../api/src/dto/stock-trade.dto'
import { createStockTrade } from '../../../../../api/stockTrades'
import CustomModal from '../../../../../components/CustomModal'
import StockTradeForm from '../../../../../components/StockTradeForm'

const StockTradeMenuItem = ({ strategyId }: { strategyId: string }) => {
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Form control
  const {
    register: stockFormRegister,
    handleSubmit: stockFormHandleSubmit,
    setValue: setStockFormValue,
    reset: resetStockForm,
    getValues: getStockFormValues,
  } = useForm<CreateStockTradeDto>()

  const stockTradesMutation = useMutation({
    mutationFn: (dto: CreateStockTradeDto) => {
      return createStockTrade(strategyId, dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategies', strategyId] })
    },
  })
  const onStockFormSubmit: SubmitHandler<CreateStockTradeDto> = (data) => {
    stockTradesMutation.mutate(data)
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
          resetStockForm()
        }}
        primaryAction={() => {
          // Fill in position
          const quantity = getStockFormValues('quantity')
          const position = quantity < 0 ? 'SHORT' : 'LONG'
          setStockFormValue('quantity', Math.abs(quantity))
          setStockFormValue('position', position)

          // Format dates
          const openDate = getStockFormValues('openDate')
          setStockFormValue(
            'openDate',
            parse(openDate, 'dd/MM/yyyy', new Date()).toISOString(),
          )

          const closeDate = getStockFormValues('closeDate')
          if (closeDate) {
            setStockFormValue(
              'closeDate',
              parse(closeDate, 'dd/MM/yyyy', new Date()).toISOString(),
            )
          }

          // Submit
          stockFormHandleSubmit(onStockFormSubmit)()
          resetStockForm()
        }}
        isOpen={isOpen}
        onClose={onClose}
        bodyElement={
          <StockTradeForm
            registerFn={stockFormRegister}
            setValue={setStockFormValue}
          />
        }
      />
    </>
  )
}

export default StockTradeMenuItem
