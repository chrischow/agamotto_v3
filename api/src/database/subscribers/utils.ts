import { EntityManager } from 'typeorm'

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

  for (const optionTrade of allOptionTrades) {
    const positionMultiplier = optionTrade.position === 'LONG' ? 1 : -1
    const isPutOption = optionTrade.instrument === 'PUT'
    if (
      optionTrade.closePrice === undefined ||
      optionTrade.closePrice === null
    ) {
      account.openOptionsProfit -=
        optionTrade.openPrice * optionTrade.quantity * 100 * positionMultiplier
      if (isPutOption) {
        account.numberOfOpenPutTrades += 1
      } else {
        account.numberOfOpenCallTrades += 1
      }
    } else {
      account.realisedOptionsProfit +=
        (optionTrade.closePrice - optionTrade.openPrice) *
        optionTrade.quantity *
        100 *
        positionMultiplier
      if (isPutOption) {
        account.numberOfClosedPutTrades += 1
      } else {
        account.numberOfClosedCallTrades += 1
      }
    }
  }

  // Process stock trades
  const allStockTrades = await stockTradeRepo.find({
    where: { strategy: { userId } },
    relations: { strategy: true },
  })

  for (const stockTrade of allStockTrades) {
    const positionMultiplier = stockTrade.position === 'LONG' ? 1 : -1

    if (stockTrade.closePrice === undefined || stockTrade.closePrice === null) {
      account.openStocksPosition -=
        stockTrade.openPrice * stockTrade.quantity * positionMultiplier
      account.numberOfOpenStockTrades += 1
    } else {
      account.realisedStocksProfit +=
        (stockTrade.closePrice - stockTrade.openPrice) *
        stockTrade.quantity *
        positionMultiplier
      account.numberOfClosedStockTrades += 1
    }
  }

  await accountRepo.save(account)
}
