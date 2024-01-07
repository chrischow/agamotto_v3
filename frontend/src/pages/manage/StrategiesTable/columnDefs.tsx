import { Link, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Link as ReactRouterLink } from 'react-router-dom'

import { StrategySummaryResponse } from '../../../../../api/src/dto/strategy.dto'
import { currencyFormatter } from '../../../utils'

const columnHelper = createColumnHelper<StrategySummaryResponse>()

export const strategiesTableColumns = [
  columnHelper.accessor('name', {
    cell: (info) => (
      <Link
        color="purple.500"
        as={ReactRouterLink}
        to={`/manage/${info.row.original.id}`}
      >
        {info.getValue()}
      </Link>
    ),
    header: 'Name',
  }),
  columnHelper.accessor('totalRealisedProfit', {
    cell: (info) => (
      <Text fontFamily="mono">
        {currencyFormatter.format(info.row.original.totalRealisedProfit)}
      </Text>
    ),
    header: 'Realised Profit',
  }),
  columnHelper.accessor('totalOpenProfit', {
    cell: (info) => (
      <Text fontFamily="mono">
        {currencyFormatter.format(info.row.original.totalOpenProfit)}
      </Text>
    ),
    header: 'Open Profit',
  }),
  columnHelper.accessor('numOptionTrades', {
    cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
    header: 'Option Trades',
  }),
  columnHelper.accessor('numStockTrades', {
    cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
    header: 'Stock Trades',
  }),
  columnHelper.accessor('executedAt', {
    cell: (info) => format(new Date(info.getValue()), 'd MMM yyyy'),
    header: 'Executed',
  }),
  columnHelper.accessor('lastActivity', {
    cell: (info) => format(new Date(info.getValue()), 'd MMM yyyy'),
    header: 'Last Activity',
  }),
]
