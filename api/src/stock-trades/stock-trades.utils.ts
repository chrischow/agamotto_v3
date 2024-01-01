import { StockTrade } from '../database/entities/stock-trade.entity'

export const computeStockTradesStats = (trades: StockTrade[]) => {
  const stats = {
    openStocksProfit: 0,
    realisedStocksProfit: 0,
    numberOfOpenStockTrades: 0,
    numberOfClosedStockTrades: 0,
  }

  for (const trade of trades) {
    const positionMultiplier = trade.position === 'LONG' ? 1 : -1

    if (trade.closePrice === undefined || trade.closePrice === null) {
      stats.openStocksProfit -=
        trade.openPrice * trade.quantity * positionMultiplier
      stats.numberOfOpenStockTrades += 1
    } else {
      stats.realisedStocksProfit +=
        (trade.closePrice - trade.openPrice) *
        trade.quantity *
        positionMultiplier
      stats.numberOfClosedStockTrades += 1
    }
  }

  return stats
}
