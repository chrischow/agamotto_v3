import {
  CreateStockTradeDto,
  GetStockTradeDetailResponseDto,
} from '../../../api/src/dto/stock-trade.dto'
import { deleteQuery, get, post, put } from './common'

export const createStockTrade = async (
  strategyId: string,
  dto: CreateStockTradeDto,
) => {
  return await post(`strategies/${strategyId}/stocks`, dto)
}

export const getStockTrade = async (
  strategyId: string,
  stockTradeId: string,
): Promise<GetStockTradeDetailResponseDto> => {
  return await get(`strategies/${strategyId}/stocks/${stockTradeId}`)
}

export const updateStockTrade = async (
  strategyId: string,
  stockTradeId: string,
  dto: CreateStockTradeDto,
) => {
  return await put(`strategies/${strategyId}/stocks/${stockTradeId}`, dto)
}

export const deleteStockTrade = async (
  strategyId: string,
  stockTradeId: string,
) => {
  return await deleteQuery(`strategies/${strategyId}/stocks/${stockTradeId}`)
}
