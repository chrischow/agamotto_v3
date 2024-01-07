import { StockTrade } from '../database/entities/stock-trade.entity'

export const computeStockTradesStats = (trades: StockTrade[]) => {
  const stats = {
    openStocksProfit: 0,
    realisedStocksProfit: 0,
    numOpenStockTrades: 0,
    numClosedStockTrades: 0,
  }

  for (const trade of trades) {
    const positionMultiplier = trade.position === 'LONG' ? 1 : -1

    if (trade.closePrice === undefined || trade.closePrice === null) {
      stats.openStocksProfit -=
        trade.openPrice * trade.quantity * positionMultiplier
      stats.numOpenStockTrades += 1
    } else {
      stats.realisedStocksProfit +=
        (trade.closePrice - trade.openPrice) *
        trade.quantity *
        positionMultiplier
      stats.numClosedStockTrades += 1
    }
  }

  return stats
}
