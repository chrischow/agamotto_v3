import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import { StatsByTicker } from '../../../../../api/src/dto/account.dto'
import CustomTable from '../../../components/CustomTable'
import { strategiesTableColumns } from './columnDefs'

const StatsTable = ({ tickers }: { tickers: StatsByTicker[] }) => {
  const [sortState, setSortState] = useState<SortingState>([])

  const table = useReactTable({
    data: tickers,
    columns: strategiesTableColumns,
    state: {
      sorting: sortState,
    },
    onSortingChange: setSortState,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: true,
  })

  return <CustomTable table={table} />
}

export default StatsTable
