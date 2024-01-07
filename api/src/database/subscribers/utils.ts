import { EntityManager } from 'typeorm'

import { computeOptionTradesStats } from '../../option-trades/option-trades.utils'
import { computeStockTradesStats } from '../../stock-trades/stock-trades.utils'
import { Account } from '../entities/account.entity'
import { OptionTrade } from '../entities/option-trade.entity'
import { StockTrade } from '../entities/stock-trade.entity'
import { Strategy } from '../entities/strategy.entity'

export const getParentStrategyAndUserId = async (
  tradeId: string,
  manager: EntityManager,
  assetType: 'option' | 'stock',
): Promise<{ userId: string; strategyId: string }> => {
  // Get the user via the strategy
  const strategyRepo = manager.getRepository(Strategy)
  const assetColumn = assetType === 'option' ? 'optionTrades' : 'stockTrades'
  const strategy = await strategyRepo.findOne({
    where: {
      [assetColumn]: {
        id: tradeId,
      },
    },
    relations: {
      [assetColumn]: true,
    },
    withDeleted: true,
  })
  return { userId: strategy.userId, strategyId: strategy.id }
}

export const computeStrategyStats = async (
  strategyId: string,
  manager: EntityManager,
) => {
  const optionTradeRepo = manager.getRepository(OptionTrade)
  const stockTradeRepo = manager.getRepository(StockTrade)

  // Process option trades
  const allOptionTrades = await optionTradeRepo.find({
    where: { strategyId },
  })

  const {
    openOptionsProfit,
    realisedOptionsProfit,
    numOpenPuts,
    numClosedPuts,
    numOpenCalls,
    numClosedCalls,
  } = computeOptionTradesStats(allOptionTrades)

  // Process stock trades
  const allStockTrades = await stockTradeRepo.find({
    where: { strategyId },
  })

  const {
    openStocksProfit,
    realisedStocksProfit,
    numOpenStockTrades,
    numClosedStockTrades,
  } = computeStockTradesStats(allStockTrades)

  return {
    openOptionsProfit,
    realisedOptionsProfit,
    openStocksProfit,
    realisedStocksProfit,
    numOpenPuts,
    numClosedPuts,
    numOpenCalls,
    numClosedCalls,
    numOpenStockTrades,
    numClosedStockTrades,
  }
}

export const recomputeAndSaveAccountStats = async (
  userId: string,
  manager: EntityManager,
) => {
  // Get account to update
  const accountRepo = manager.getRepository(Account)
  const account = await accountRepo.findOne({ where: { id: userId } })
  const strategyRepo = manager.getRepository(Strategy)
  const strategies = await strategyRepo.find({ where: { userId } })

  // Stats
  const stats = {
    openOptionsProfit: 0,
    realisedOptionsProfit: 0,
    openStocksProfit: 0,
    realisedStocksProfit: 0,
    numOpenPuts: 0,
    numClosedPuts: 0,
    numOpenCalls: 0,
    numClosedCalls: 0,
    numOpenStockTrades: 0,
    numClosedStockTrades: 0,
  }

  for (const strategy of strategies) {
    const strategyStats = await computeStrategyStats(strategy.id, manager)
    stats.openOptionsProfit += strategyStats.openOptionsProfit
    stats.realisedOptionsProfit += strategyStats.realisedOptionsProfit
    stats.openStocksProfit += strategyStats.openStocksProfit
    stats.realisedStocksProfit += strategyStats.realisedStocksProfit
    stats.numOpenPuts += strategyStats.numOpenPuts
    stats.numClosedPuts += strategyStats.numClosedPuts
    stats.numOpenCalls += strategyStats.numOpenCalls
    stats.numClosedCalls += strategyStats.numClosedCalls
    stats.numOpenStockTrades += strategyStats.numOpenStockTrades
    stats.numClosedStockTrades += strategyStats.numClosedStockTrades
  }

  // Update account
  account.openOptionsProfit = stats.openOptionsProfit
  account.realisedOptionsProfit = stats.realisedOptionsProfit
  account.numOpenPuts = stats.numOpenPuts
  account.numClosedPuts = stats.numClosedPuts
  account.numOpenCalls = stats.numOpenCalls
  account.numClosedCalls = stats.numClosedCalls
  account.openStocksProfit = stats.openStocksProfit
  account.realisedStocksProfit = stats.realisedStocksProfit
  account.numOpenStockTrades = stats.numOpenStockTrades
  account.numClosedStockTrades = stats.numClosedStockTrades

  await accountRepo.save(account)
}

export const recomputeAndSaveStrategyStats = async (
  strategyId: string,
  manager: EntityManager,
) => {
  // Get strategy to update
  const strategyRepo = manager.getRepository(Strategy)
  const strategy = await strategyRepo.findOne({ where: { id: strategyId } })

  const stats = await computeStrategyStats(strategyId, manager)
  strategy.openOptionsProfit = stats.openOptionsProfit
  strategy.realisedOptionsProfit = stats.realisedOptionsProfit
  strategy.openStocksProfit = stats.openStocksProfit
  strategy.realisedStocksProfit = stats.realisedStocksProfit
  strategy.numOpenPuts = stats.numOpenPuts
  strategy.numClosedPuts = stats.numClosedPuts
  strategy.numOpenCalls = stats.numOpenCalls
  strategy.numClosedCalls = stats.numClosedCalls
  strategy.numOpenStockTrades = stats.numOpenStockTrades
  strategy.numClosedStockTrades = stats.numClosedStockTrades

  await strategyRepo.save(strategy)
}
