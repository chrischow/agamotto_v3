import {
  CreateStrategyRequestDto,
  GetAllStrategiesResponseDto,
  GetStrategyResponseDto,
} from '../../../api/src/dto/strategy.dto'
import { get, post } from './common'

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
