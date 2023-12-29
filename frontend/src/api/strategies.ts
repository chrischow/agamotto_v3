import {
  CreateStrategyRequestDto,
  GetAllStrategiesResponseDto,
} from '../../../api/src/dto/strategy.dto'
import { get, post } from './common'

export const getAllStrategies =
  async (): Promise<GetAllStrategiesResponseDto> => {
    return await get('strategies')
  }

export const createStrategy = async (dto: CreateStrategyRequestDto) => {
  return await post('strategies', dto)
}
