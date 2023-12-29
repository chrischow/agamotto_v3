import { Heading, HStack, Spacer, Text } from '@chakra-ui/react'

import StrategiesTable from './StrategiesTable'
import StrategyFormInModal from './StrategyFormInModal'

const ManagePage = () => {
  return (
    <>
      <Heading>Manage Strategies</Heading>
      <HStack mt={4} alignItems="end">
        <Text fontSize="large">
          Create a new strategy, or edit existing strategies.
        </Text>
        <Spacer />
        <StrategyFormInModal />
      </HStack>
      <StrategiesTable />
    </>
  )
}

export default ManagePage
