import { Button, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format, parse } from 'date-fns'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaRegEdit } from 'react-icons/fa'

import {
  CreateOptionTradeDto,
  GetOptionTradeDetailResponseDto,
} from '../../../../../../../../api/src/dto/option-trade.dto'
import { updateOptionTrade } from '../../../../../../api/optionTrades'
import CustomModal from '../../../../../../components/CustomModal'
import OptionTradeForm from '../../../../../../components/OptionTradeForm'

const EditOptionTradeModal = ({
  strategyId,
  optionTradeId,
  data,
}: {
  strategyId: string
  optionTradeId: string
  data: GetOptionTradeDetailResponseDto
}) => {
  const defaultValues = {
    ticker: data.ticker,
    instrument: data.instrument,
    expiry: format(new Date(data.expiry), 'yyyy-MM-dd'),
    strike: data.strike,
    position: data.position,
    quantity: data.quantity * (data.position === 'LONG' ? 1 : -1),
    openDate: format(new Date(data.openDate), 'yyyy-MM-dd'),
    openPrice: data.openPrice,
    openDelta: data.openDelta,
    closeDate: data.closeDate
      ? format(new Date(data.closeDate), 'yyyy-MM-dd')
      : undefined,
    closePrice: data.closePrice,
    closeDelta: data.closeDelta,
    remarks: data.remarks,
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const queryClient = useQueryClient()

  // Form control
  const { register, handleSubmit, setValue, reset } =
    useForm<CreateOptionTradeDto>({
      defaultValues,
    })

  useEffect(() => {
    setValue('ticker', data.ticker)
    setValue('instrument', data.instrument)
    setValue('expiry', format(new Date(data.expiry), 'yyyy-MM-dd'))
    setValue('strike', data.strike)
    setValue('position', data.position)
    setValue('quantity', data.quantity * (data.position === 'LONG' ? 1 : -1))
    setValue('openDate', format(new Date(data.openDate), 'yyyy-MM-dd'))
    setValue('openPrice', data.openPrice)
    setValue('openDelta', data.openDelta)
    setValue(
      'closeDate',
      data.closeDate
        ? format(new Date(data.closeDate), 'yyyy-MM-dd')
        : undefined,
    )
    setValue('closePrice', data.closePrice)
    setValue('closeDelta', data.closeDelta)
    setValue('remarks', data.remarks)
  }, [data])

  const mutation = useMutation({
    mutationFn: (dto: CreateOptionTradeDto) => {
      return updateOptionTrade(strategyId, optionTradeId, dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['options', optionTradeId],
      })
    },
  })
  const onSubmit: SubmitHandler<CreateOptionTradeDto> = (data) => {
    const amendedData = { ...data }

    // Fill in position
    const { quantity, openDate, expiry, closeDate } = data
    const position = data.position ?? (quantity < 0 ? 'SHORT' : 'LONG')
    amendedData.quantity = Math.abs(quantity)
    amendedData.position = position

    // Format dates
    amendedData.openDate = parse(
      openDate,
      'yyyy-MM-dd',
      new Date(),
    ).toISOString()
    amendedData.expiry = parse(expiry, 'yyyy-MM-dd', new Date()).toISOString()

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
      <Button leftIcon={<FaRegEdit />} onClick={onOpen}>
        Edit
      </Button>
      <CustomModal
        modalSize="xl"
        title="Edit Option Trade"
        primaryText="Save Changes"
        secondaryText="Cancel"
        primaryAction={() => {
          handleSubmit(onSubmit)()
          reset()
        }}
        secondaryAction={reset}
        bodyElement={
          <OptionTradeForm
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

export default EditOptionTradeModal
