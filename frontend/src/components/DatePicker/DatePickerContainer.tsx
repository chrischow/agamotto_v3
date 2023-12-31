import {
  Flex,
  Input,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  usePopover,
} from '@chakra-ui/react'
import { useEffect } from 'react'

import { DatePickerContent } from './DatePickerContent'
import { useDatePicker } from './DatePickerContext'
import { DatePickerHeader } from './DatePickerHeader'

export const DatePickerContainer = ({
  registerProps,
  onDateChange,
}: {
  registerProps: object
  onDateChange?: (date: Date | null) => void
}) => {
  const popover = usePopover()
  const {
    selectedDate: [date],
  } = useDatePicker()

  const value = date?.getTime() === 0 ? '' : date?.toLocaleDateString()
  const onFocus = () => popover?.getTriggerProps?.()?.onClick?.(null as any)

  const onChange = () => {
    onDateChange?.(date)
  }

  useEffect(() => {
    onChange()
  }, [date])

  return (
    <>
      <PopoverTrigger>
        <Input
          value={value}
          onFocus={onFocus}
          onChange={onChange}
          colorScheme="purple"
          focusBorderColor="purple.400"
          {...registerProps}
        />
      </PopoverTrigger>
      <PopoverContent width="auto">
        <PopoverArrow />
        <PopoverBody>
          <Flex direction="column">
            <DatePickerHeader />
            <DatePickerContent />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </>
  )
}
