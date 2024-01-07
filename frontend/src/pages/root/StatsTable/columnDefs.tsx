import { Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'

import { StatsByTicker } from '../../../../../api/src/dto/account.dto'
import { currencyFormatter } from '../../../utils'

const columnHelper = createColumnHelper<StatsByTicker>()

export const strategiesTableColumns = [
  columnHelper.accessor('ticker', {
    cell: (info) => info.getValue(),
    header: 'Ticker',
  }),
  columnHelper.group({
    header: 'Combined',
    columns: [
      columnHelper.group({
        header: 'Profits',
        columns: [
          columnHelper.display({
            cell: (info) => {
              const { realisedOptionsProfit, realisedStocksProfit } =
                info.row.original
              return (
                <Text fontFamily="mono">
                  {currencyFormatter.format(
                    realisedOptionsProfit + realisedStocksProfit,
                  )}
                </Text>
              )
            },
            header: 'Realised',
          }),
          columnHelper.display({
            cell: (info) => {
              const { openOptionsProfit, openStocksProfit } = info.row.original
              return (
                <Text fontFamily="mono">
                  {currencyFormatter.format(
                    openOptionsProfit + openStocksProfit,
                  )}
                </Text>
              )
            },
            header: 'Open',
          }),
        ],
      }),
    ],
  }),
  columnHelper.group({
    header: 'Options',
    columns: [
      columnHelper.group({
        header: 'Profits',
        columns: [
          columnHelper.accessor('openOptionsProfit', {
            cell: (info) => (
              <Text fontFamily="mono">
                {currencyFormatter.format(info.getValue())}
              </Text>
            ),
            header: 'Open',
          }),
          columnHelper.accessor('realisedOptionsProfit', {
            cell: (info) => (
              <Text fontFamily="mono">
                {currencyFormatter.format(info.getValue())}
              </Text>
            ),
            header: 'Realised',
          }),
        ],
      }),
      columnHelper.group({
        header: 'Put Trades',
        columns: [
          columnHelper.accessor('numOpenPuts', {
            cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
            header: 'Open',
          }),
          columnHelper.accessor('numClosedPuts', {
            cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
            header: 'Closed',
          }),
        ],
      }),
      columnHelper.group({
        header: 'Call Trades',
        columns: [
          columnHelper.accessor('numOpenCalls', {
            cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
            header: 'Open',
          }),
          columnHelper.accessor('numClosedCalls', {
            cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
            header: 'Closed',
          }),
        ],
      }),
    ],
  }),
  columnHelper.group({
    header: 'Stocks',
    columns: [
      columnHelper.group({
        header: 'Profits',
        columns: [
          columnHelper.accessor('openStocksProfit', {
            cell: (info) => (
              <Text fontFamily="mono">
                {currencyFormatter.format(info.getValue())}
              </Text>
            ),
            header: 'Open',
          }),
          columnHelper.accessor('realisedStocksProfit', {
            cell: (info) => (
              <Text fontFamily="mono">
                {currencyFormatter.format(info.getValue())}
              </Text>
            ),
            header: 'Realised',
          }),
        ],
      }),
      columnHelper.group({
        header: 'Trades',
        columns: [
          columnHelper.accessor('numOpenStockTrades', {
            cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
            header: 'Open',
          }),
          columnHelper.accessor('numClosedStockTrades', {
            cell: (info) => <Text fontFamily="mono">{info.getValue()}</Text>,
            header: 'Closed',
          }),
        ],
      }),
    ],
  }),
]
