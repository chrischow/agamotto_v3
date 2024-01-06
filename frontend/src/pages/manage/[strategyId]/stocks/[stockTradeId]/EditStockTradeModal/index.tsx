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
  const { register, handleSubmit, setValue, reset } =
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
    // Amended data
    const amendedData = JSON.parse(JSON.stringify(data))

    // Fill in position
    const quantity = data.quantity
    const position = data.position ?? (quantity < 0 ? 'SHORT' : 'LONG')
    amendedData.quantity = Math.abs(quantity)
    amendedData.position = position

    // Format dates
    amendedData.openDate = parse(
      data.openDate,
      'yyyy-MM-dd',
      new Date(),
    ).toISOString()
    if (data.closeDate) {
      amendedData.closeDate = parse(
        data.closeDate,
        'yyyy-MM-dd',
        new Date(),
      ).toISOString()
    }

    mutation.mutate(amendedData)
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
