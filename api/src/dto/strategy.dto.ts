import { IsOptional, IsString } from 'class-validator'

import { OptionTradeDetail } from './option-trade.dto'
import { StockTradeDetail } from './stock-trade.dto'

export class CreateStrategyRequestDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description: string
}

export interface CreateStrategyResponseDto {
  message: string
  id: string
}

export class UpdateStrategyRequestDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  description?: string
}

export interface StrategySummaryResponse {
  id: string
  name: string
  description?: string
  numOptionTrades: number
  numStockTrades: number
  totalOpenProfit: number
  totalRealisedProfit: number
  executedAt: string
  lastActivity: string
}

export interface GetAllStrategiesResponseDto {
  strategies: StrategySummaryResponse[]
}

export interface GetStrategyResponseDto {
  id: string
  name: string
  openOptionsProfit: number
  realisedOptionsProfit: number
  openStocksProfit: number
  realisedStocksProfit: number
  numOpenPuts: number
  numClosedPuts: number
  numOpenCalls: number
  numClosedCalls: number
  numOpenStockTrades: number
  numClosedStockTrades: number
  description?: string
  optionTrades: OptionTradeDetail[]
  stockTrades: StockTradeDetail[]
}

export interface GetOptionTradesForStrategyResponseDto {
  id: string
  optionTrades: OptionTradeDetail[]
}

export interface GetStockTradesForStrategyResponseDto {
  id: string
  stockTrades: StockTradeDetail[]
}
