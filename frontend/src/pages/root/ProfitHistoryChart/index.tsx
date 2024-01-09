import 'chartjs-adapter-date-fns'

import { Box } from '@chakra-ui/react'
import {
  BarElement,
  Chart as ChartJS,
  Legend,
  LinearScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { ProfitHistory } from '../../../../../api/src/dto/account.dto'

ChartJS.register(
  TimeSeriesScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      type: 'time' as const,
      time: {
        unit: 'month' as const,
      },
    },
  },
}

const ProfitHistoryChart = ({
  profitHistory,
}: {
  profitHistory: ProfitHistory
}) => {
  const labels = Object.keys(profitHistory)
  const realisedProfitsOptions: number[] = []
  const realisedProfitsStocks: number[] = []
  const openProfitsOptions: number[] = []
  const openProfitsStocks: number[] = []

  for (const profits of Object.values(profitHistory)) {
    realisedProfitsOptions.push(profits.realised.options)
    realisedProfitsStocks.push(profits.realised.stocks)
    openProfitsOptions.push(profits.open.options)
    openProfitsStocks.push(profits.open.stocks)
  }
  const data = {
    labels,
    datasets: [
      {
        label: 'Realised - Options',
        data: realisedProfitsOptions,
        backgroundColor: 'rgba(128, 90, 213, 0.6)',
      },
      {
        label: 'Open - Options',
        data: openProfitsOptions,
        backgroundColor: 'rgba(49, 151, 149, 0.6)',
      },
      {
        label: 'Realised - Stocks',
        data: realisedProfitsStocks,
        backgroundColor: 'rgba(213, 63, 140, 0.6)',
        hidden: true,
      },
      {
        label: 'Open - Stocks',
        data: openProfitsStocks,
        backgroundColor: 'rgba(56, 161, 105, 0.6)',
        hidden: true,
      },
    ],
  }
  return (
    <Box mt={4}>
      <Bar options={options} data={data} />
    </Box>
  )
}

export default ProfitHistoryChart
