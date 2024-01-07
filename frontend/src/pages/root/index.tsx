import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { getAccountDetails } from '../../api/account'
import { currencyFormatter, getStatColor } from '../../utils'
import MetricCard from './MetricCard'
import ProfitHistoryChart from './ProfitHistoryChart'
import StatsTable from './StatsTable'

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getAccountDetails,
  })

  return (
    <>
      <Heading>Dashboard</Heading>
      {data && (
        <>
          <SimpleGrid mt={8} width="100%" columns={2} spacing={12}>
            <Box>
              <Heading size="lg">Options</Heading>
              <SimpleGrid mt={4} width="100%" columns={2} spacing={6}>
                <MetricCard
                  label="Open Profits"
                  stat={currencyFormatter.format(data.openOptionsProfit)}
                  textColor={getStatColor(data.openOptionsProfit)}
                />
                <MetricCard
                  label="Realised Profits"
                  stat={currencyFormatter.format(data.realisedOptionsProfit)}
                  textColor={getStatColor(data.realisedOptionsProfit)}
                />
                <MetricCard
                  label="Open Positions"
                  stat={(data.numOpenPuts + data.numOpenCalls).toString()}
                />
                <MetricCard
                  label="Closed Positions"
                  stat={(data.numClosedPuts + data.numClosedCalls).toString()}
                />
              </SimpleGrid>
            </Box>
            <Box>
              <Heading size="lg">Stocks</Heading>
              <SimpleGrid mt={4} width="100%" columns={2} spacing={6}>
                <MetricCard
                  label="Open Profits"
                  stat={currencyFormatter.format(data.openStocksProfit)}
                  textColor={getStatColor(data.openStocksProfit)}
                />
                <MetricCard
                  label="Realised Profits"
                  stat={currencyFormatter.format(data.realisedStocksProfit)}
                  textColor={getStatColor(data.realisedStocksProfit)}
                />
                <MetricCard
                  label="Open Positions"
                  stat={data.numOpenStockTrades.toString()}
                />
                <MetricCard
                  label="Closed Positions"
                  stat={data.numClosedStockTrades.toString()}
                />
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </>
      )}
      <Heading mt={8} size="lg">
        Tickers
      </Heading>
      {data && <StatsTable tickers={data.tradeStats.tickers} />}
      <Heading mt={8} size="lg">
        Profit History
      </Heading>
      {data && (
        <ProfitHistoryChart profitHistory={data.tradeStats.profitHistory} />
      )}
    </>
  )
}

export default Dashboard
