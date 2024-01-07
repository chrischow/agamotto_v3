import {
  Heading,
  HStack,
  IconButton,
  Spacer,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { RiRefreshLine } from 'react-icons/ri'

import { updateAllStrategyStats } from '../../api/strategies'
import StrategiesTable from './StrategiesTable'
import StrategyFormInModal from './StrategyFormInModal'

const ManagePage = () => {
  const queryClient = useQueryClient()

  return (
    <>
      <HStack>
        <Heading>Manage Strategies</Heading>
        <Tooltip label="Update stats" hasArrow>
          <IconButton
            icon={<RiRefreshLine />}
            aria-label="Update stats"
            size="sm"
            variant="ghost"
            onClick={async () => {
              await updateAllStrategyStats()
              queryClient.invalidateQueries({ queryKey: ['strategies'] })
            }}
          />
        </Tooltip>
      </HStack>
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
