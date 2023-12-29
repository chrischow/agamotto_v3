import { OptionTrade } from '../database/entities/option-trade.entity'

export const computeOptionTradesStats = (trades: OptionTrade[]) => {
  const stats = {
    openOptionsProfit: 0,
    realisedOptionsProfit: 0,
    numberOfOpenPutTrades: 0,
    numberOfClosedPutTrades: 0,
    numberOfOpenCallTrades: 0,
    numberOfClosedCallTrades: 0,
  }

  for (const trade of trades) {
    const positionMultiplier = trade.position === 'LONG' ? 1 : -1
    const isPutOption = trade.instrument === 'PUT'
    if (trade.closePrice === undefined || trade.closePrice === null) {
      stats.openOptionsProfit -=
        trade.openPrice * trade.quantity * 100 * positionMultiplier
      if (isPutOption) {
        stats.numberOfOpenPutTrades += 1
      } else {
        stats.numberOfOpenCallTrades += 1
      }
    } else {
      stats.realisedOptionsProfit +=
        (trade.closePrice - trade.openPrice) *
        trade.quantity *
        100 *
        positionMultiplier
      if (isPutOption) {
        stats.numberOfClosedPutTrades += 1
      } else {
        stats.numberOfClosedCallTrades += 1
      }
    }
  }

  return stats
}
