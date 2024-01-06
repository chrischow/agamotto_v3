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
    enableMultiSort: true,
  }),
  columnHelper.display({
    cell: (info) => (
      <Text fontFamily="mono">
        {currencyFormatter.format(
          info.row.original.optionsProfit + info.row.original.stocksProfit,
        )}
      </Text>
    ),
    header: 'Total Profit',
  }),
  columnHelper.accessor('numOptionTrades', {
    cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
    header: 'Option Trades',
    enableMultiSort: true,
  }),
  columnHelper.accessor('numStockTrades', {
    cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
    header: 'Stock Trades',
    enableMultiSort: true,
  }),
  columnHelper.accessor('executedAt', {
    cell: (info) => format(new Date(info.getValue()), 'd MMM yyyy'),
    header: 'Executed',
    enableMultiSort: true,
  }),
  columnHelper.accessor('lastActivity', {
    cell: (info) => format(new Date(info.getValue()), 'd MMM yyyy'),
    header: 'Last Activity',
    enableMultiSort: true,
  }),
]
