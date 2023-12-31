import { Popover } from '@chakra-ui/react'

import { DatePickerContainer } from './DatePickerContainer'
import { DatePickerProvider } from './DatePickerContext'

export const DatePicker = ({
  time,
  initialValue,
  onDateChange,
  registerProps,
}: {
  time?: boolean
  initialValue?: Date
  onDateChange?: (date: Date | null) => void
  registerProps: object
}) => {
  return (
    <DatePickerProvider initialValue={initialValue} time={time}>
      <Popover placement="bottom-start">
        <DatePickerContainer
          onDateChange={onDateChange}
          registerProps={registerProps}
        />
      </Popover>
    </DatePickerProvider>
  )
}
