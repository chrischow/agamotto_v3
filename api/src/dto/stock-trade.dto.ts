import { IsIn, IsInt, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateStockTradeDto {
  @IsString()
  ticker: string

  @IsInt()
  quantity: number

  @IsIn(['LONG', 'SHORT'])
  position: string

  @IsNumber()
  openPrice: number

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
  ticker: string

  @IsOptional()
  @IsInt()
  quantity: number

  @IsOptional()
  @IsIn(['LONG', 'SHORT'])
  position: string

  @IsOptional()
  @IsNumber()
  openPrice: number

  @IsNumber()
  closePrice: number

  @IsString()
  remarks?: string
}

export interface StockTradeDetail {
  id: string
  ticker: string
  quantity: number
  position: string
  openPrice: number
  closePrice?: number
  remarks?: string
}
