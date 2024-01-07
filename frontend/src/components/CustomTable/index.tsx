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
import { flexRender, Table as ReactTable } from '@tanstack/react-table'
import { ReactElement } from 'react'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from 'react-icons/ti'

const CustomTable = <T,>({ table }: { table: ReactTable<T> }) => {
  return (
    <>
      <TableContainer mt={8} width="100%">
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSortable = header.column.getCanSort()
                  const isGroupHeader = header.subHeaders.length > 0
                  const sortDirection = header.column.getIsSorted() as string
                  let icon: ReactElement | undefined = undefined

                  switch (sortDirection) {
                    case 'asc':
                      icon = (
                        <IconButton
                          icon={<TiArrowSortedUp />}
                          aria-label="Sorted ascending"
                          size="xs"
                          variant="ghost"
                        />
                      )
                      break
                    case 'desc':
                      icon = (
                        <IconButton
                          icon={<TiArrowSortedDown />}
                          aria-label="Sorted descending"
                          size="xs"
                          variant="ghost"
                        />
                      )
                      break
                    default:
                      icon = (
                        <IconButton
                          icon={<TiArrowUnsorted />}
                          aria-label="Unsorted"
                          size="xs"
                          variant="ghost"
                        />
                      )
                  }
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      cursor={isSortable ? 'pointer' : undefined}
                      onClick={
                        isSortable
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      <HStack alignItems="center">
                        <Text>
                          {header
                            .getContext()
                            .column.columnDef.header?.toString()}
                        </Text>
                        {isSortable && !isGroupHeader ? icon : null}
                      </HStack>
                    </Th>
                  )
                })}
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
