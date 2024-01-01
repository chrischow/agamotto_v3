import { Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'

import { StatsByTicker } from '../../../../../api/src/dto/account.dto'
import { currencyFormatter } from '../../../utils'

const columnHelper = createColumnHelper<StatsByTicker>()

export const strategiesTableColumns = [
  columnHelper.accessor('ticker', {
    cell: (info) => info.getValue(),
    header: 'Ticker',
  }),
  columnHelper.display({
    cell: (info) => {
      const { realisedOptionsProfit, realisedStocksProfit } = info.row.original
      return (
        <Text fontFamily="mono">
          {currencyFormatter.format(
            realisedOptionsProfit + realisedStocksProfit,
          )}
        </Text>
      )
    },
    header: 'Total Realised Profit',
  }),
  columnHelper.display({
    cell: (info) => {
      const { openOptionsProfit, openStocksProfit } = info.row.original
      return (
        <Text fontFamily="mono">
          {currencyFormatter.format(openOptionsProfit + openStocksProfit)}
        </Text>
      )
    },
    header: 'Total Open Profit',
  }),
  columnHelper.accessor('openOptionsProfit', {
    cell: (info) => (
      <Text fontFamily="mono">{currencyFormatter.format(info.getValue())}</Text>
    ),
    header: 'Open Options Profit',
  }),
  columnHelper.accessor('realisedOptionsProfit', {
    cell: (info) => (
      <Text fontFamily="mono">{currencyFormatter.format(info.getValue())}</Text>
    ),
    header: 'Realised Options Profit',
  }),
  columnHelper.accessor('numberOfOpenPutTrades', {
    cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
    header: 'No. of Open Puts',
  }),
  columnHelper.accessor('numberOfClosedPutTrades', {
    cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
    header: 'No. of Closed Puts',
  }),
  columnHelper.accessor('numberOfOpenCallTrades', {
    cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
    header: 'No. of Open Calls',
  }),
  columnHelper.accessor('numberOfClosedCallTrades', {
    cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
    header: 'No. of Closed Calls',
  }),
  columnHelper.accessor('openStocksProfit', {
    cell: (info) => (
      <Text fontFamily="mono">{currencyFormatter.format(info.getValue())}</Text>
    ),
    header: 'Open Stocks Profit',
  }),
  columnHelper.accessor('realisedStocksProfit', {
    cell: (info) => (
      <Text fontFamily="mono">{currencyFormatter.format(info.getValue())}</Text>
    ),
    header: 'Realised Stocks Profit',
  }),
]
