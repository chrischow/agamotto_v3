import { Heading, TabPanel } from '@chakra-ui/react'
import { Table } from '@tanstack/react-table'

import CustomTable from '../../../../components/CustomTable'
import NoDataPlaceholder from '../../../../components/NoDataPlaceholder'

const TradesPanel = <T,>({
  asset,
  table,
}: {
  asset: string
  table: Table<T>
}) => {
  return (
    <TabPanel>
      <Heading mt={2} size="lg">
        {asset}
      </Heading>
      {table.getCoreRowModel().rows.length > 0 ? (
        <CustomTable table={table} />
      ) : (
        <NoDataPlaceholder />
      )}
    </TabPanel>
  )
}

export default TradesPanel
