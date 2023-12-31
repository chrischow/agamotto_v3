import {
  IsDateString,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateOptionTradeDto {
  @IsString()
  ticker: string

  @IsIn(['PUT', 'CALL'])
  instrument: string

  @IsInt()
  quantity: number

  @IsIn(['LONG', 'SHORT'])
  position: string

  @IsDateString()
  expiry: string

  @IsDateString()
  openDate: string

  @IsNumber()
  openPrice: number

  @IsNumber()
  openDelta: number

  @IsOptional()
  @IsDateString()
  closeDate?: string

  @IsOptional()
  @IsNumber()
  closePrice?: number

  @IsOptional()
  @IsNumber()
  closeDelta?: number

  @IsNumber()
  strike: number

  @IsOptional()
  @IsString()
  remarks?: string
}

export class UpdateOptionTradeDto {
  @IsOptional()
  @IsString()
  ticker?: string

  @IsOptional()
  @IsIn(['PUT', 'CALL'])
  instrument?: string

  @IsOptional()
  @IsInt()
  quantity?: number

  @IsOptional()
  @IsIn(['LONG', 'SHORT'])
  position?: string

  @IsOptional()
  @IsDateString()
  expiry?: string

  @IsOptional()
  @IsDateString()
  openDate?: string

  @IsOptional()
  @IsNumber()
  openPrice?: number

  @IsOptional()
  @IsNumber()
  openDelta?: number

  @IsOptional()
  @IsDateString()
  closeDate?: number

  @IsOptional()
  @IsNumber()
  closePrice?: number

  @IsOptional()
  @IsNumber()
  closeDelta?: number

  @IsOptional()
  @IsNumber()
  strike?: number

  @IsOptional()
  @IsString()
  remarks?: string
}

export interface OptionTradeDetail {
  id: string
  ticker: string
  instrument: string
  quantity: number
  position: string
  expiry: Date
  openDate: Date
  openPrice: number
  openDelta: number
  closeDate?: Date
  closePrice?: number
  closeDelta?: number
  strike: number
  remarks?: string
}
