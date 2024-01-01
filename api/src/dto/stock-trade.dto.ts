import {
  IsDateString,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateStockTradeDto {
  @IsString()
  ticker: string

  @IsInt()
  quantity: number

  @IsIn(['LONG', 'SHORT'])
  position: string

  @IsDateString()
  openDate: string

  @IsNumber()
  openPrice: number

  @IsOptional()
  @IsDateString()
  closeDate?: string

  @IsOptional()
  @IsNumber()
  closePrice?: number

  @IsOptional()
  @IsString()
  remarks?: string
}

export class UpdateStockTradeDto {
  @IsOptional()
  @IsString()
  ticker?: string

  @IsOptional()
  @IsInt()
  quantity?: number

  @IsOptional()
  @IsIn(['LONG', 'SHORT'])
  position?: string

  @IsOptional()
  @IsDateString()
  openDate?: string

  @IsOptional()
  @IsNumber()
  openPrice?: number

  @IsOptional()
  @IsDateString()
  closeDate?: string

  @IsOptional()
  @IsNumber()
  closePrice?: number

  @IsOptional()
  @IsString()
  remarks?: string
}

export interface StockTradeDetail {
  id: string
  ticker: string
  quantity: number
  position: string
  openDate: Date
  openPrice: number
  closeDate?: Date
  closePrice?: number
  remarks?: string
  strategyId: string
}

export interface GetStockTradeDetailResponseDto {
  id: string
  ticker: string
  quantity: number
  position: string
  openDate: string
  openPrice: number
  closeDate?: string
  closePrice?: number
  remarks?: string
  strategyId: string
}
