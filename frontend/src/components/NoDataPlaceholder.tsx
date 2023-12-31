import { Center, Text } from '@chakra-ui/react'

const NoDataPlaceholder = () => {
  return (
    <Center>
      <Text fontSize="x-large" mt={6}>
        No data to display.
      </Text>
    </Center>
  )
}

export default NoDataPlaceholder
