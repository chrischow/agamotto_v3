import { IsOptional, IsString } from 'class-validator'

import { OptionTradeDetail } from './option-trade.dto'
import { StockTradeDetail } from './stock-trade.dto'

export class CreateStrategyRequestDto {
  @IsString()
  name: string

  @IsString()
  description: string
}

export class UpdateStrategyRequestDto extends CreateStrategyRequestDto {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description: string
}

export interface StrategySummaryResponse {
  id: string
  name: string
  description?: string
  numOptionTrades: number
  numStockTrades: number
}

export interface GetAllStrategiesResponseDto {
  strategies: StrategySummaryResponse[]
}

export interface GetStrategyResponseDto {
  id: string
  name: string
  description?: string
  optionTrades: OptionTradeDetail[]
  stockTrades: StockTradeDetail[]
}