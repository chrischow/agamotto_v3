import {
  CreateStrategyRequestDto,
  GetAllStrategiesResponseDto,
  GetStrategyResponseDto,
  UpdateStrategyRequestDto,
} from '../../../api/src/dto/strategy.dto'
import { deleteQuery, get, post, put } from './common'

export const getAllStrategies =
  async (): Promise<GetAllStrategiesResponseDto> => {
    return await get('strategies')
  }

export const createStrategy = async (dto: CreateStrategyRequestDto) => {
  return await post('strategies', dto)
}

export const getStrategy = async (
  strategyId: string,
): Promise<GetStrategyResponseDto> => {
  return await get(`strategies/${strategyId}`)
}
export const updateStrategy = async (
  strategyId: string,
  dto: UpdateStrategyRequestDto,
) => {
  return await put(`strategies/${strategyId}`, dto)
}

export const deleteStrategy = async (strategyId: string) => {
  return await deleteQuery(`strategies/${strategyId}`)
}
