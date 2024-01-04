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
      type: 'timeseries' as const,
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
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Profits',
        data: Object.values(profitHistory),
        backgroundColor: 'rgba(128, 90, 213, 0.6)',
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
