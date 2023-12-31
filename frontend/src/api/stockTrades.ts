import { CreateStockTradeDto } from '../../../api/src/dto/stock-trade.dto'
import { post } from './common'

export const createStockTrade = async (
  strategyId: string,
  dto: CreateStockTradeDto,
) => {
  return await post(`strategies/${strategyId}/stocks`, dto)
}
