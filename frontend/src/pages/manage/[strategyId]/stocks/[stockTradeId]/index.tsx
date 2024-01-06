import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { MdChevronRight } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'

import { getStockTrade } from '../../../../../api/stockTrades'
import InfoCard from '../../../../../components/InfoCard'
import { currencyFormatter } from '../../../../../utils'
import DeleteStockTradeModal from './DeleteStockTradeModal'
import EditStockTradeModal from './EditStockTradeModal'

const StockTradeDetailPage = () => {
  const params = useParams()
  const strategyId = params?.strategyId as string
  const stockTradeId = params?.stockTradeId as string
  const [isTradeOpen, setIsTradeOpen] = useState(false)
  const [profit, setProfit] = useState<number | undefined>()
  const { data } = useQuery({
    queryKey: ['stocks', stockTradeId],
    queryFn: () => getStockTrade(strategyId, stockTradeId),
  })

  useEffect(() => {
    if (data) {
      if (data.closeDate != null && data.closePrice != null) {
        const positionMultiplier = data.position === 'LONG' ? 1 : -1
        setIsTradeOpen(false)
        setProfit(
          (data.closePrice - data.openPrice) *
            data.quantity *
            positionMultiplier,
        )
      } else {
        setIsTradeOpen(true)
      }
    }
  }, [data])

  return (
    <>
      {data && (
        <VStack width="100%" alignItems="start">
          <Breadcrumb spacing={2} separator={<MdChevronRight />}>
            <BreadcrumbItem>
              <BreadcrumbLink color="purple.500" as={Link} to="/manage">
                All Strategies
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink color="purple.600" href={`/manage/${strategyId}`}>
                Strategy
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.600" href="#">
                Stock
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <HStack mt={2} alignItems="center">
            <Heading>{data.ticker}</Heading>
            <Tag ml={2} colorScheme={isTradeOpen ? 'teal' : undefined}>
              {isTradeOpen ? 'Open' : 'Closed'}
            </Tag>
          </HStack>
          <HStack width="100%" alignItems="center">
            <Text fontSize="large" mt={2}>
              Inspect and edit stock trade details.
            </Text>
            <Spacer />
            <EditStockTradeModal
              strategyId={strategyId}
              stockTradeId={stockTradeId}
              data={data}
            />
            <DeleteStockTradeModal
              strategyId={strategyId}
              stockTradeId={stockTradeId}
            />
          </HStack>
          <SimpleGrid width="100%" mt={6} columns={3} spacing={8}>
            <InfoCard label="Ticker" content={data.ticker} />
            <InfoCard label="Position" content={data.position} />
            <InfoCard
              label="Quantity"
              content={data.quantity.toString()}
              isNumeric
            />
            {!isTradeOpen && (
              <InfoCard
                label="Profit"
                content={profit ? currencyFormatter.format(profit) : '-'}
                isNumeric
              />
            )}
          </SimpleGrid>
          <Heading size="lg" mt={6}>
            Transaction Details
          </Heading>
          <TableContainer mt={2} width="100%">
            <Table>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Opening Trade</Th>
                  <Th>Closing Trade</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Date</Td>
                  <Td>{format(new Date(data.openDate), 'd MMM yyyy')}</Td>
                  <Td>
                    {data.closeDate
                      ? format(new Date(data.closeDate), 'd MMM yyyy')
                      : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Price</Td>
                  <Td fontFamily="mono">
                    {currencyFormatter.format(data.openPrice)}
                  </Td>
                  <Td fontFamily="mono">
                    {data.closePrice != null
                      ? currencyFormatter.format(data.closePrice)
                      : '-'}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      )}
    </>
  )
}

export default StockTradeDetailPage
