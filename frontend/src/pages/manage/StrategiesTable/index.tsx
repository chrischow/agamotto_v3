import { useQuery } from '@tanstack/react-query'
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import { StrategySummaryResponse } from '../../../../../api/src/dto/strategy.dto'
import { getAllStrategies } from '../../../api/strategies'
import CustomTable from '../../../components/CustomTable'
import { strategiesTableColumns } from './columnDefs'

const StrategiesTable = () => {
  const [strategies, setStrategies] = useState<StrategySummaryResponse[]>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const { data } = useQuery({
    queryKey: ['strategies'],
    queryFn: getAllStrategies,
  })

  useEffect(() => {
    if (data) {
      setStrategies(data.strategies)
    }
  }, [data])

  const table = useReactTable({
    data: strategies,
    columns: strategiesTableColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 50 } },
  })

  return <CustomTable table={table} />
}

export default StrategiesTable
