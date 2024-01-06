import { Kbd, MenuItem, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'date-fns'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CreateOptionTradeDto } from '../../../../../../../api/src/dto/option-trade.dto'
import { createOptionTrade } from '../../../../../api/optionTrades'
import CustomModal from '../../../../../components/CustomModal'
import OptionTradeForm from '../../../../../components/OptionTradeForm'

const OptionTradeMenuItem = ({
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
    useForm<CreateOptionTradeDto>({ defaultValues: { instrument: 'PUT' } })

  const mutation = useMutation({
    mutationFn: (dto: CreateOptionTradeDto) => {
      return createOptionTrade(strategyId, dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategies', strategyId] })
    },
  })
  const onSubmit: SubmitHandler<CreateOptionTradeDto> = (data) => {
    const amendedData = { ...data }
    const { quantity, openDate, expiry, closeDate } = data
    // Fill in position
    const position = quantity < 0 ? 'SHORT' : 'LONG'
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
      <MenuItem onClick={onOpen}>
        Option Trade <Kbd ml={2}>O</Kbd>
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
          activateTab()
          reset()
        }}
        isOpen={isOpen}
        onClose={onClose}
        bodyElement={
          <OptionTradeForm registerFn={register} setValue={setValue} />
        }
      />
    </>
  )
}

export default OptionTradeMenuItem
