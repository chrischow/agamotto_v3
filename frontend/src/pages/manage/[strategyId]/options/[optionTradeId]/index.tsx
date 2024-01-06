import {
  Box,
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

import { getOptionTrade } from '../../../../../api/optionTrades'
import InfoCard from '../../../../../components/InfoCard'
import { currencyFormatter } from '../../../../../utils'
import DeleteOptionTradeModal from './DeleteOptionTradeModal'
import EditOptionTradeModal from './EditOptionTradeModal'

const OptionTradeDetailPage = () => {
  const params = useParams()
  const strategyId = params?.strategyId as string
  const optionTradeId = params?.optionTradeId as string
  const [isTradeOpen, setIsTradeOpen] = useState(false)
  const [profit, setProfit] = useState<number | undefined>()
  const { data } = useQuery({
    queryKey: ['options', optionTradeId],
    queryFn: () => getOptionTrade(strategyId, optionTradeId),
  })

  useEffect(() => {
    if (data) {
      if (data.closeDate != null && data.closePrice != null) {
        const positionMultiplier = data.position === 'LONG' ? 1 : -1
        setIsTradeOpen(false)
        setProfit(
          (data.closePrice - data.openPrice) *
            data.quantity *
            positionMultiplier *
            100,
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
                Option
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <HStack mt={2} alignItems="center">
            <Heading>
              {`${data.ticker} ${format(
                new Date(data.expiry),
                'd MMM yyyy',
              )} ${data.strike.toFixed(2)} ${data.instrument}`}
            </Heading>
            <Tag ml={2} colorScheme={isTradeOpen ? 'teal' : undefined}>
              {isTradeOpen ? 'Open' : 'Closed'}
            </Tag>
          </HStack>
          <HStack width="100%" alignItems="center">
            <Text fontSize="large" mt={2}>
              Inspect and edit option trade details.
            </Text>
            <Spacer />
            <EditOptionTradeModal
              strategyId={strategyId}
              optionTradeId={optionTradeId}
              data={data}
            />
            <DeleteOptionTradeModal
              strategyId={strategyId}
              optionTradeId={optionTradeId}
            />
          </HStack>
          <SimpleGrid width="100%" mt={6} columns={4} spacing={6}>
            <InfoCard label="Ticker" content={data.ticker} />
            <InfoCard label="Instrument" content={data.instrument} />
            <InfoCard
              label="Expiry"
              content={format(new Date(data.expiry), 'd MMM yyyy')}
            />
            <InfoCard
              label="Strike"
              content={currencyFormatter.format(data.strike)}
              isNumeric
            />
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
          <Box mt={4}>
            <InfoCard
              label="Remarks"
              content={data.remarks ? data.remarks : '-'}
              isMaxWidth
            />
          </Box>
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
                <Tr>
                  <Td>Delta</Td>
                  <Td fontFamily="mono">{data.openDelta.toFixed(3)}</Td>
                  <Td fontFamily="mono">
                    {data.closeDelta != null ? data.closeDelta.toFixed(3) : '-'}
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

export default OptionTradeDetailPage
