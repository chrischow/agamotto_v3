import { FormControl, FormLabel, Input, Text, Textarea } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

import { CreateStrategyRequestDto } from '../../../../../api/src/dto/strategy.dto'
import { createStrategy } from '../../../api/strategies'
import CustomModal from '../../../components/CustomModal'

const StrategyFormInModal = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleNameChange = (event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  const handleDescriptionChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setDescription(event.currentTarget.value)
  }

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (dto: CreateStrategyRequestDto) => {
      return createStrategy(dto)
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['strategies'] }),
  })

  const submitForm = async () => {
    if (name !== '' && description !== '') {
      mutation.mutate({ name, description })
    }
  }

  return (
    <>
      <CustomModal
        modalSize="xl"
        openButtonText="Create"
        openButtonColorScheme="purple"
        openButtonVariant="ghost"
        leftIcon={<IoMdAdd />}
        title="New Strategy"
        primaryText="Create"
        secondaryText="Cancel"
        primaryAction={submitForm}
        bodyElement={
          <>
            <Text>
              Strategies are used to group options and/or stock trades together
              (e.g. Iron Condor). You must create a strategy in order to log
              trades.
            </Text>
            <FormControl mt={8}>
              <FormLabel>Name Your Strategy</FormLabel>
              <Input type="text" value={name} onChange={handleNameChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>
                Describe it e.g. the underlying asset, frequency, some
                principles
              </FormLabel>
              <Textarea
                value={description}
                onChange={handleDescriptionChange}
              />
            </FormControl>
          </>
        }
      />
    </>
  )
}

export default StrategyFormInModal
