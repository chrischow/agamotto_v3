import { Button, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format, parse } from 'date-fns'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaRegEdit } from 'react-icons/fa'

import {
  CreateStockTradeDto,
  GetStockTradeDetailResponseDto,
} from '../../../../../../../../api/src/dto/stock-trade.dto'
import { updateStockTrade } from '../../../../../../api/stockTrades'
import CustomModal from '../../../../../../components/CustomModal'
import StockTradeForm from '../../../../../../components/StockTradeForm'

const EditStockTradeModal = ({
  strategyId,
  stockTradeId,
  data,
}: {
  strategyId: string
  stockTradeId: string
  data: GetStockTradeDetailResponseDto
}) => {
  const defaultValues = {
    ticker: data.ticker,
    position: data.position,
    quantity: data.quantity * (data.position === 'LONG' ? 1 : -1),
    openDate: format(new Date(data.openDate), 'yyyy-MM-dd'),
    openPrice: data.openPrice,
    closeDate: data.closeDate
      ? format(new Date(data.closeDate), 'yyyy-MM-dd')
      : undefined,
    closePrice: data.closePrice,
    remarks: data.remarks,
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const queryClient = useQueryClient()

  // Form control
  const { register, handleSubmit, setValue, reset, getValues } =
    useForm<CreateStockTradeDto>({
      defaultValues,
    })

  useEffect(() => {
    setValue('ticker', data.ticker)
    setValue('position', data.position)
    setValue('quantity', data.quantity * (data.position === 'LONG' ? 1 : -1))
    setValue('openDate', format(new Date(data.openDate), 'yyyy-MM-dd'))
    setValue('openPrice', data.openPrice)
    setValue(
      'closeDate',
      data.closeDate
        ? format(new Date(data.closeDate), 'yyyy-MM-dd')
        : undefined,
    )
    setValue('remarks', data.remarks)
    setValue('closePrice', data.closePrice)
  }, [data])

  const mutation = useMutation({
    mutationFn: (dto: CreateStockTradeDto) => {
      return updateStockTrade(strategyId, stockTradeId, dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['stocks', stockTradeId],
      })
    },
  })
  const onSubmit: SubmitHandler<CreateStockTradeDto> = (data) => {
    mutation.mutate(data)
  }

  return (
    <>
      <Button leftIcon={<FaRegEdit />} onClick={onOpen}>
        Edit
      </Button>
      <CustomModal
        modalSize="xl"
        title="Edit Stock Trade"
        primaryText="Save Changes"
        secondaryText="Cancel"
        primaryAction={() => {
          // Fill in position
          const quantity = getValues('quantity')
          const position = quantity < 0 ? 'SHORT' : 'LONG'
          setValue('quantity', Math.abs(quantity))
          setValue('position', position)

          // Format dates
          const openDate = getValues('openDate')

          setValue(
            'openDate',
            parse(openDate, 'd/MM/yyyy', new Date()).toISOString(),
          )

          const closeDate = getValues('closeDate')
          if (closeDate) {
            setValue(
              'closeDate',
              parse(closeDate, 'd/MM/yyyy', new Date()).toISOString(),
            )
          }

          // Submit
          handleSubmit(onSubmit)()
          reset()
        }}
        secondaryAction={reset}
        bodyElement={
          <StockTradeForm
            registerFn={register}
            setValue={setValue}
            defaultValues={defaultValues}
          />
        }
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

export default EditStockTradeModal
