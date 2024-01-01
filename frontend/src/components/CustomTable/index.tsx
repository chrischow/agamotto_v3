import {
  Box,
  Flex,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { flexRender, Table as ReactTable } from '@tanstack/react-table'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'

const CustomTable = <T,>({ table }: { table: ReactTable<T> }) => {
  return (
    <>
      <TableContainer mt={8} width="100%">
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} colSpan={header.colSpan}>
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

export default CustomTable
