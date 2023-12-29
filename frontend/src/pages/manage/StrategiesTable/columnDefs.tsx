import { Link, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Link as ReactRouterLink } from 'react-router-dom'

import { StrategySummaryResponse } from '../../../../../api/src/dto/strategy.dto'

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
  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
    header: 'Description',
  }),
  columnHelper.accessor('numOptionTrades', {
    cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
    header: 'Option Trades',
  }),
  columnHelper.accessor('numStockTrades', {
    cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
    header: 'Stock Trades',
  }),
  columnHelper.accessor('createdAt', {
    cell: (info) => format(new Date(info.getValue()), 'd MMM yyyy'),
    header: 'Created',
  }),
]
