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
  SimpleGrid,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { useState } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

import { CreateStockTradeDto } from '../../../../api/src/dto/stock-trade.dto'

const StockTradeForm = ({
  registerFn,
  setValue,
  defaultValues,
}: {
  registerFn: UseFormRegister<CreateStockTradeDto>
  setValue: UseFormSetValue<CreateStockTradeDto>
  defaultValues?: CreateStockTradeDto
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
          <NumberInput defaultValue={0} step={1} focusBorderColor="purple.400">
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
      <Text mt={4} fontSize="large" fontFamily="brand" fontWeight="600">
        Opening Trade
      </Text>
      <SimpleGrid mt={2} columns={2} spacing={2}>
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
          {/* <DatePicker
            initialValue={
              defaultValues && defaultValues.openDate
                ? new Date(
                    parse(defaultValues.openDate, 'd/MM/yyyy', new Date()),
                  )
                : new Date()
            }
            registerProps={registerFn('openDate')}
          /> */}
          <Input type="date" {...registerFn('openDate')} />
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
            if (!defaultValues || !defaultValues.closePrice) {
              setValue('closePrice', undefined)
            } else {
              setValue('closePrice', defaultValues.closePrice)
            }

            if (!defaultValues || !defaultValues.closeDate) {
              if (isClosingTradeShown) {
                setValue('closeDate', undefined)
              } else {
                setValue('closeDate', format(new Date(), 'yyyy-MM-dd'))
              }
            } else {
              setValue(
                'closeDate',
                format(new Date(defaultValues.closeDate), 'yyyy-MM-dd'),
              )
            }
          }}
        />
      </HStack>

      {isClosingTradeShown && (
        <SimpleGrid mt={2} columns={2} spacing={2}>
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
            {/* <DatePicker
              initialValue={
                defaultValues && defaultValues.closeDate
                  ? new Date(
                      parse(defaultValues.closeDate, 'd/MM/yyyy', new Date()),
                    )
                  : new Date()
              }
              registerProps={registerFn('closeDate')}
            /> */}
            <Input type="date" {...registerFn('closeDate')} />
          </FormControl>
        </SimpleGrid>
      )}
      <FormControl mt={4}>
        <FormLabel>Remarks (Optional)</FormLabel>
        <Textarea
          focusBorderColor="purple.400"
          {...registerFn('remarks')}
        ></Textarea>
      </FormControl>
    </>
  )
}

export default StockTradeForm
