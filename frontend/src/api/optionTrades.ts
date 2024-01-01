import {
  CreateOptionTradeDto,
  GetOptionTradeDetailResponseDto,
  UpdateOptionTradeDto,
} from '../../../api/src/dto/option-trade.dto'
import { deleteQuery, get, post, put } from './common'

export const createOptionTrade = async (
  strategyId: string,
  dto: CreateOptionTradeDto,
) => {
  return await post(`strategies/${strategyId}/options`, dto)
}

export const getOptionTrade = async (
  strategyId: string,
  optionTradeId: string,
): Promise<GetOptionTradeDetailResponseDto> => {
  return await get(`strategies/${strategyId}/options/${optionTradeId}`)
}

export const updateOptionTrade = async (
  strategyId: string,
  optionTradeId: string,
  dto: UpdateOptionTradeDto,
) => {
  return await put(`strategies/${strategyId}/options/${optionTradeId}`, dto)
}

export const deleteOptionTrade = async (
  strategyId: string,
  optionTradeId: string,
) => {
  return await deleteQuery(`strategies/${strategyId}/options/${optionTradeId}`)
}
