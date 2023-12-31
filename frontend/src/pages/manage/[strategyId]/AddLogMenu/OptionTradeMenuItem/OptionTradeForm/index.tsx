import {
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { useState } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

import { CreateOptionTradeDto } from '../../../../../../../../api/src/dto/option-trade.dto'
import { DatePicker } from '../../../../../../components/DatePicker'

const OptionTradeForm = ({
  registerFn,
  setValue,
}: {
  registerFn: UseFormRegister<CreateOptionTradeDto>
  setValue: UseFormSetValue<CreateOptionTradeDto>
}) => {
  const [isClosingTradeShown, setIsClosingTradeShown] = useState<boolean>(false)

  return (
    <>
      <SimpleGrid columns={2} spacing={4}>
        <FormControl>
          <FormLabel>Ticker</FormLabel>
          <Input
            type="text"
            focusBorderColor="purple.400"
            {...registerFn('ticker')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Quantity</FormLabel>
          <NumberInput defaultValue={-1} step={1} focusBorderColor="purple.400">
            <NumberInputField
              {...registerFn('quantity', { valueAsNumber: true })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </SimpleGrid>
      <SimpleGrid mt={4} columns={3} spacing={2}>
        <FormControl>
          <FormLabel>Instrument</FormLabel>
          <RadioGroup
            defaultValue="PUT"
            onChange={(value) => setValue('instrument', value)}
          >
            <HStack spacing={4}>
              <Radio colorScheme="purple" value="PUT">
                PUT
              </Radio>
              <Radio colorScheme="purple" value="CALL">
                CALL
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Expiration</FormLabel>
          <DatePicker
            initialValue={new Date()}
            registerProps={registerFn('expiry')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Strike</FormLabel>
          <NumberInput
            defaultValue={0}
            step={0.1}
            focusBorderColor="purple.400"
          >
            <NumberInputField
              {...registerFn('strike', { valueAsNumber: true })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </SimpleGrid>
      <Text mt={4} fontSize="large" fontFamily="brand" fontWeight="600">
        Opening Trade
      </Text>
      <SimpleGrid mt={2} columns={3} spacing={2}>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <NumberInput
            defaultValue={0}
            step={0.01}
            focusBorderColor="purple.400"
          >
            <NumberInputField
              {...registerFn('openPrice', { valueAsNumber: true })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <DatePicker
            initialValue={new Date()}
            registerProps={registerFn('openDate')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Delta</FormLabel>
          <NumberInput
            defaultValue={0.25}
            max={1}
            min={0}
            step={0.01}
            focusBorderColor="purple.400"
          >
            <NumberInputField
              {...registerFn('openDelta', { valueAsNumber: true })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </SimpleGrid>

      <HStack mt={4} alignItems="center">
        <Text fontSize="large" fontFamily="brand" fontWeight="600">
          Closing Trade
        </Text>
        <IconButton
          size="sm"
          icon={isClosingTradeShown ? <FiChevronUp /> : <FiChevronDown />}
          aria-label="Expand closing trade fields"
          variant="ghost"
          onClick={() => {
            setIsClosingTradeShown(!isClosingTradeShown)
            if (isClosingTradeShown) {
              setValue('closePrice', undefined)
              setValue('closeDelta', undefined)
              setValue('closeDate', undefined)
            } else {
              setValue('closePrice', 0)
              setValue('closeDelta', 0)
              setValue('closeDate', format(new Date(), 'dd/MM/yyyy'))
            }
          }}
        />
      </HStack>

      {isClosingTradeShown && (
        <SimpleGrid mt={2} columns={3} spacing={2}>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <NumberInput
              defaultValue={0}
              step={0.01}
              focusBorderColor="purple.400"
            >
              <NumberInputField
                {...registerFn('closePrice', { valueAsNumber: true })}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <DatePicker
              initialValue={new Date()}
              registerProps={registerFn('closeDate')}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Delta</FormLabel>
            <NumberInput
              defaultValue={0.25}
              max={1}
              min={0}
              step={0.01}
              focusBorderColor="purple.400"
            >
              <NumberInputField
                {...registerFn('closeDelta', { valueAsNumber: true })}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </SimpleGrid>
      )}
      <FormControl mt={4}>
        <FormLabel>Remarks (Optional)</FormLabel>
        <Textarea focusBorderColor="purple.400"></Textarea>
      </FormControl>
    </>
  )
}

export default OptionTradeForm
