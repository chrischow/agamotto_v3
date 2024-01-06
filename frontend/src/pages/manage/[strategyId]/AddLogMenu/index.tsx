import { Button, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'

import OptionTradeMenuItem from './OptionTradeMenuItem'
import StockTradeMenuItem from './StockTradeMenuItem'

const AddLogMenu = ({
  strategyId,
  activateOptionsTab,
  activateStocksTab,
}: {
  strategyId: string
  activateOptionsTab: () => void
  activateStocksTab: () => void
}) => {
  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          colorScheme="purple"
          rightIcon={<FiChevronDown />}
        >
          Add Log
        </MenuButton>
        <MenuList>
          <OptionTradeMenuItem
            strategyId={strategyId}
            activateTab={activateOptionsTab}
          />
          <StockTradeMenuItem
            strategyId={strategyId}
            activateTab={activateStocksTab}
          />
        </MenuList>
      </Menu>
    </>
  )
}

export default AddLogMenu
