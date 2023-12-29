import { EntityManager } from 'typeorm'

import { computeOptionTradesStats } from '../../option-trades/option-trades.utils'
import { computeStockTradesStats } from '../../stock-trades/stock-trades.utils'
import { Account } from '../entities/account.entity'
import { OptionTrade } from '../entities/option-trade.entity'
import { StockTrade } from '../entities/stock-trade.entity'
import { Strategy } from '../entities/strategy.entity'

export const getUserId = async (
  optionTradeId: string,
  manager: EntityManager,
  assetType: 'option' | 'stock',
): Promise<string> => {
  // Get the user via the strategy
  const strategyRepo = manager.getRepository(Strategy)
  const assetColumn = assetType === 'option' ? 'optionTrades' : 'stockTrades'
  const strategy = await strategyRepo.findOne({
    where: {
      [assetColumn]: {
        id: optionTradeId,
      },
    },
    relations: {
      [assetColumn]: true,
    },
    withDeleted: true,
  })
  return strategy.userId
}

export const recomputeAndSaveAccountStats = async (
  userId: string,
  manager: EntityManager,
) => {
  const optionTradeRepo = manager.getRepository(OptionTrade)
  const stockTradeRepo = manager.getRepository(StockTrade)

  // Reset account
  const accountRepo = manager.getRepository(Account)
  const account = await accountRepo.findOne({ where: { id: userId } })
  account.openOptionsProfit = 0
  account.realisedOptionsProfit = 0
  account.openStocksPosition = 0
  account.realisedStocksProfit = 0
  account.numberOfOpenPutTrades = 0
  account.numberOfClosedPutTrades = 0
  account.numberOfOpenCallTrades = 0
  account.numberOfClosedCallTrades = 0
  account.numberOfOpenStockTrades = 0
  account.numberOfClosedStockTrades = 0

  // Process option trades
  const allOptionTrades = await optionTradeRepo.find({
    where: { strategy: { userId } },
    relations: { strategy: true },
  })

  const {
    openOptionsProfit,
    realisedOptionsProfit,
    numberOfOpenPutTrades,
    numberOfClosedPutTrades,
    numberOfOpenCallTrades,
    numberOfClosedCallTrades,
  } = computeOptionTradesStats(allOptionTrades)

  // Process stock trades
  const allStockTrades = await stockTradeRepo.find({
    where: { strategy: { userId } },
    relations: { strategy: true },
  })

  const {
    openStocksPosition,
    realisedStocksProfit,
    numberOfOpenStockTrades,
    numberOfClosedStockTrades,
  } = computeStockTradesStats(allStockTrades)

  // Update account
  account.openOptionsProfit = openOptionsProfit
  account.realisedOptionsProfit = realisedOptionsProfit
  account.numberOfOpenPutTrades = numberOfOpenPutTrades
  account.numberOfClosedPutTrades = numberOfClosedPutTrades
  account.numberOfOpenCallTrades = numberOfOpenCallTrades
  account.numberOfClosedCallTrades = numberOfClosedCallTrades
  account.openStocksPosition = openStocksPosition
  account.realisedStocksProfit = realisedStocksProfit
  account.numberOfOpenStockTrades = numberOfOpenStockTrades
  account.numberOfClosedStockTrades = numberOfClosedStockTrades

  await accountRepo.save(account)
}
