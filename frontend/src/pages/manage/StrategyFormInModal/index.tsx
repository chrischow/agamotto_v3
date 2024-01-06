import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

import { CreateStrategyRequestDto } from '../../../../../api/src/dto/strategy.dto'
import { createStrategy } from '../../../api/strategies'
import CustomModal from '../../../components/CustomModal'

const StrategyFormInModal = () => {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
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
    mutationFn: async (dto: CreateStrategyRequestDto) => {
      const result = await createStrategy(dto)
      navigate(`/manage/${result.id}`)
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['strategies'] }),
  })

  const submitForm = async () => {
    if (name !== '') {
      mutation.mutate({ name, description })
    }
  }

  return (
    <>
      <Button leftIcon={<IoMdAdd />} onClick={onOpen} colorScheme="purple">
        Create
      </Button>
      <CustomModal
        modalSize="xl"
        title="New Strategy"
        primaryText="Create"
        secondaryText="Cancel"
        primaryAction={submitForm}
        isOpen={isOpen}
        onClose={onClose}
        bodyElement={
          <>
            <Text>
              Strategies are used to group options and/or stock trades together
              (e.g. Iron Condor). You must create a strategy in order to log
              trades.
            </Text>
            <FormControl mt={8} isRequired>
              <FormLabel>Name the strategy</FormLabel>
              <Input type="text" value={name} onChange={handleNameChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Describe the strategy</FormLabel>
              <Textarea
                value={description}
                onChange={handleDescriptionChange}
              />
              <FormHelperText>
                For example: the underlying asset, frequency, some principles
              </FormHelperText>
            </FormControl>
          </>
        }
      />
    </>
  )
}

export default StrategyFormInModal
