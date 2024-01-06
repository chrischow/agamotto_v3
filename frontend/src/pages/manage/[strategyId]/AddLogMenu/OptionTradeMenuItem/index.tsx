import { Kbd, MenuItem, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'date-fns'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CreateOptionTradeDto } from '../../../../../../../api/src/dto/option-trade.dto'
import { createOptionTrade } from '../../../../../api/optionTrades'
import CustomModal from '../../../../../components/CustomModal'
import OptionTradeForm from '../../../../../components/OptionTradeForm'

const OptionTradeMenuItem = ({ strategyId }: { strategyId: string }) => {
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Form control
  const { register, handleSubmit, setValue, reset, getValues } =
    useForm<CreateOptionTradeDto>({ defaultValues: { instrument: 'PUT' } })

  const optionTradesMutation = useMutation({
    mutationFn: (dto: CreateOptionTradeDto) => {
      return createOptionTrade(strategyId, dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategies', strategyId] })
    },
  })
  const onSubmit: SubmitHandler<CreateOptionTradeDto> = (data) => {
    optionTradesMutation.mutate(data)
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
          // Fill in position
          const quantity = getValues('quantity')
          const position = quantity < 0 ? 'SHORT' : 'LONG'
          setValue('quantity', Math.abs(quantity))
          setValue('position', position)

          // Format dates
          const openDate = getValues('openDate')
          const expiry = getValues('expiry')
          setValue(
            'openDate',
            parse(openDate, 'yyyy-MM-dd', new Date()).toISOString(),
          )
          setValue(
            'expiry',
            parse(expiry, 'yyyy-MM-dd', new Date()).toISOString(),
          )

          const closeDate = getValues('closeDate')
          if (closeDate) {
            setValue(
              'closeDate',
              parse(closeDate, 'yyyy-MM-dd', new Date()).toISOString(),
            )
          }

          // Submit
          handleSubmit(onSubmit)()
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
