import { CreateOptionTradeDto } from '../../../api/src/dto/option-trade.dto'
import { post } from './common'

export const createOptionTrade = async (
  strategyId: string,
  dto: CreateOptionTradeDto,
) => {
  return await post(`strategies/${strategyId}/options`, dto)
}
