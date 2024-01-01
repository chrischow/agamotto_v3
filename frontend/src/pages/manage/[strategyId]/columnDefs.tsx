import { Link, Tag, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Link as ReactRouterLink } from 'react-router-dom'

import { OptionTradeDetail } from '../../../../../api/src/dto/option-trade.dto'
import { StockTradeDetail } from '../../../../../api/src/dto/stock-trade.dto'
import { currencyFormatter } from '../../../utils'

const optionTradesTableColumnHelper = createColumnHelper<OptionTradeDetail>()
export const optionTradesTableColumns = [
  optionTradesTableColumnHelper.accessor('ticker', {
    cell: (info) => (
      <Link
        color="purple.500"
        as={ReactRouterLink}
        to={`/manage/${info.row.original.strategyId}/options/${info.row.original.id}`}
      >
        {info.getValue()}
      </Link>
    ),
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
      <Text fontFamily="mono">{currencyFormatter.format(info.getValue())}</Text>
    ),
    header: 'Strike',
  }),
  optionTradesTableColumnHelper.accessor('quantity', {
    cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
    header: 'Qty',
  }),
  optionTradesTableColumnHelper.accessor('expiry', {
    cell: (info) => format(new Date(info.getValue()), 'd MMM yyyy'),
    header: 'Expiry',
  }),
  optionTradesTableColumnHelper.display({
    cell: (info) => {
      const row = info.row.original
      if (row.closeDate && row.closePrice) {
        return <Tag>Closed</Tag>
      } else {
        return <Tag colorScheme="teal">Open</Tag>
      }
    },
    header: 'Status',
  }),
  optionTradesTableColumnHelper.display({
    cell: (info) => {
      const { closeDate, closePrice, openPrice, position, quantity } =
        info.row.original
      const positionMultiplier = position === 'LONG' ? 1 : -1
      const profit =
        closeDate != null && closePrice != null
          ? (closePrice - openPrice) * positionMultiplier * quantity * 100
          : undefined
      return (
        <Text fontFamily="mono">
          {profit ? currencyFormatter.format(profit) : '-'}
        </Text>
      )
    },
    header: 'Profit',
  }),
]

const stockTradesTableColumnHelper = createColumnHelper<StockTradeDetail>()
export const stockTradesTableColumns = [
  stockTradesTableColumnHelper.accessor('ticker', {
    cell: (info) => (
      <Link
        color="purple.500"
        as={ReactRouterLink}
        to={`/manage/${info.row.original.strategyId}/stocks/${info.row.original.id}`}
      >
        {info.getValue()}
      </Link>
    ),
    header: 'Ticker',
  }),
  stockTradesTableColumnHelper.accessor('position', {
    cell: (info) => info.getValue(),
    header: 'Position',
  }),
  stockTradesTableColumnHelper.accessor('quantity', {
    cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
    header: 'Qty',
  }),
  stockTradesTableColumnHelper.display({
    cell: (info) => {
      const row = info.row.original
      if (row.closeDate && row.closePrice) {
        return <Tag>Closed</Tag>
      } else {
        return <Tag colorScheme="teal">Open</Tag>
      }
    },
    header: 'Status',
  }),
  stockTradesTableColumnHelper.display({
    cell: (info) => {
      const { closeDate, closePrice, openPrice, position, quantity } =
        info.row.original
      const positionMultiplier = position === 'LONG' ? 1 : -1
      const profit =
        closeDate != null && closePrice != null
          ? (closePrice - openPrice) * positionMultiplier * quantity * 100
          : undefined
      return (
        <Text fontFamily="mono">
          {profit ? currencyFormatter.format(profit) : '-'}
        </Text>
      )
    },
    header: 'Profit',
  }),
]
