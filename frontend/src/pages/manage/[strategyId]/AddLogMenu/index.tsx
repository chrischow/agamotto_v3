import { Button, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'

import OptionTradeMenuItem from './OptionTradeMenuItem'
import StockTradeMenuItem from './StockTradeMenuItem'

const AddLogMenu = ({ strategyId }: { strategyId: string }) => {
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
          <OptionTradeMenuItem strategyId={strategyId} />
          <StockTradeMenuItem strategyId={strategyId} />
        </MenuList>
      </Menu>
    </>
  )
}

export default AddLogMenu
