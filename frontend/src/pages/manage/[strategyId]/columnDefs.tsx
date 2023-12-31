import { Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'

import { OptionTradeDetail } from '../../../../../api/src/dto/option-trade.dto'
import { StockTradeDetail } from '../../../../../api/src/dto/stock-trade.dto'

const optionTradesTableColumnHelper = createColumnHelper<OptionTradeDetail>()
export const optionTradesTableColumns = [
  // columnHelper.accessor('name', {
  //   cell: (info) => (
  //     <Link
  //       color="purple.500"
  //       as={ReactRouterLink}
  //       to={`/manage/${info.row.original.id}`}
  //     >
  //       {info.getValue()}
  //     </Link>
  //   ),
  //   header: 'Name',
  // }),
  optionTradesTableColumnHelper.accessor('ticker', {
    cell: (info) => info.getValue(),
    header: 'Ticker',
  }),
  optionTradesTableColumnHelper.accessor('position', {
    cell: (info) => info.getValue(),
    header: 'Position',
  }),
  optionTradesTableColumnHelper.accessor('instrument', {
    cell: (info) => info.getValue(),
    header: 'Instrument',
  }),
  optionTradesTableColumnHelper.accessor('strike', {
    cell: (info) => (
      <Text fontFamily="mono">${info.getValue().toFixed(2)}</Text>
    ),
    header: 'Strike',
  }),
  optionTradesTableColumnHelper.accessor('quantity', {
    cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
    header: 'Quantity',
  }),
  optionTradesTableColumnHelper.accessor('expiry', {
    cell: (info) => format(new Date(info.getValue()), 'd MMM yyyy'),
    header: 'Expiry',
  }),
  optionTradesTableColumnHelper.accessor('openPrice', {
    cell: (info) => (
      <Text fontFamily="mono">${info.getValue().toFixed(2)}</Text>
    ),
    header: 'Open Price',
  }),
  optionTradesTableColumnHelper.accessor('openDate', {
    cell: (info) => format(new Date(info.getValue()), 'd MMM yyyy'),
    header: 'Open Date',
  }),
  optionTradesTableColumnHelper.accessor('closePrice', {
    cell: (info) => {
      const cellValue = info.getValue()
      if (cellValue) {
        return <Text fontFamily="mono">${cellValue.toFixed()}</Text>
      } else {
        return ''
      }
    },
    header: 'Close Price',
  }),
  optionTradesTableColumnHelper.accessor('closeDate', {
    cell: (info) => {
      const cellValue = info.getValue()
      if (cellValue) {
        return format(new Date(cellValue), 'd MMM yyyy')
      } else {
        return ''
      }
    },
    header: 'Close Date',
  }),
]

const stockTradesTableColumnHelper = createColumnHelper<StockTradeDetail>()
export const stockTradesTableColumns = [
  // columnHelper.accessor('name', {
  //   cell: (info) => (
  //     <Link
  //       color="purple.500"
  //       as={ReactRouterLink}
  //       to={`/manage/${info.row.original.id}`}
  //     >
  //       {info.getValue()}
  //     </Link>
  //   ),
  //   header: 'Name',
  // }),
  stockTradesTableColumnHelper.accessor('ticker', {
    cell: (info) => info.getValue(),
    header: 'Ticker',
  }),
  stockTradesTableColumnHelper.accessor('quantity', {
    cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
    header: 'Quantity',
  }),
  stockTradesTableColumnHelper.accessor('position', {
    cell: (info) => info.getValue(),
    header: 'Position',
  }),
  stockTradesTableColumnHelper.accessor('openPrice', {
    cell: (info) => (
      <Text fontFamily="mono">${info.getValue().toFixed(2)}</Text>
    ),
    header: 'Open Price',
  }),
  stockTradesTableColumnHelper.accessor('openDate', {
    cell: (info) => format(new Date(info.getValue()), 'd MMM yyyy'),
    header: 'Open Date',
  }),
  stockTradesTableColumnHelper.accessor('closePrice', {
    cell: (info) => {
      const cellValue = info.getValue()
      if (cellValue) {
        return <Text fontFamily="mono">${cellValue.toFixed()}</Text>
      } else {
        return ''
      }
    },
    header: 'Close Price',
  }),
  stockTradesTableColumnHelper.accessor('closeDate', {
    cell: (info) => {
      const cellValue = info.getValue()
      if (cellValue) {
        return format(new Date(cellValue), 'd MMM yyyy')
      } else {
        return ''
      }
    },
    header: 'Close Date',
  }),
]
