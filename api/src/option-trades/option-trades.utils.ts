import { OptionTrade } from '../database/entities/option-trade.entity'

export const computeOptionTradesStats = (trades: OptionTrade[]) => {
  const stats = {
    openOptionsProfit: 0,
    realisedOptionsProfit: 0,
    numOpenPuts: 0,
    numClosedPuts: 0,
    numOpenCalls: 0,
    numClosedCalls: 0,
  }

  for (const trade of trades) {
    const positionMultiplier = trade.position === 'LONG' ? 1 : -1
    const isPutOption = trade.instrument === 'PUT'
    if (trade.closePrice === undefined || trade.closePrice === null) {
      stats.openOptionsProfit -=
        trade.openPrice * trade.quantity * 100 * positionMultiplier
      if (isPutOption) {
        stats.numOpenPuts += 1
      } else {
        stats.numOpenCalls += 1
      }
    } else {
      stats.realisedOptionsProfit +=
        (trade.closePrice - trade.openPrice) *
        trade.quantity *
        100 *
        positionMultiplier
      if (isPutOption) {
        stats.numClosedPuts += 1
      } else {
        stats.numClosedCalls += 1
      }
    }
  }

  return stats
}
