import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { StatsByTicker } from '../../../../../api/src/dto/account.dto'
import CustomTable from '../../../components/CustomTable'
import { strategiesTableColumns } from './columnDefs'

const StatsTable = ({ tickers }: { tickers: StatsByTicker[] }) => {
  const table = useReactTable({
    data: tickers,
    columns: strategiesTableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return <CustomTable table={table} />
}

export default StatsTable
