import {
  Box,
  Flex,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'

import { StrategySummaryResponse } from '../../../../../api/src/dto/strategy.dto'
import { getAllStrategies } from '../../../api/strategies'

const columnHelper = createColumnHelper<StrategySummaryResponse>()

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
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
    header: 'Stock Trades',
  }),
]

const StrategiesTable = () => {
  const [strategies, setStrategies] = useState<StrategySummaryResponse[]>([])

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
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <TableContainer mt={8} width="100%">
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex mt={4} justifyContent="end">
        <HStack>
          <IconButton
            icon={<MdKeyboardDoubleArrowLeft />}
            aria-label="Go to first page"
            onClick={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
          />
          <IconButton
            icon={<MdKeyboardArrowLeft />}
            aria-label="Go to previous page"
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          />
          <Box mx={1}>
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{' '}
            <strong>{table.getPageCount()}</strong>
          </Box>
          <IconButton
            icon={<MdKeyboardArrowRight />}
            aria-label="Go to next page"
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          />
          <IconButton
            icon={<MdKeyboardDoubleArrowRight />}
            aria-label="Go to last page"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            isDisabled={!table.getCanNextPage()}
          />
        </HStack>
      </Flex>
    </>
  )
}

export default StrategiesTable
