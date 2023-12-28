import {
  IsCurrency,
  IsDateString,
  IsIn,
  IsInt,
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

  @IsCurrency()
  openPrice: number

  @IsCurrency()
  closePrice: number

  @IsCurrency()
  strike: number

  @IsString()
  remarks?: string
}

export class UpdateOptionTradeDto extends CreateOptionTradeDto {
  @IsOptional()
  @IsString()
  ticker: string

  @IsOptional()
  @IsIn(['PUT', 'CALL'])
  instrument: string

  @IsOptional()
  @IsInt()
  quantity: number

  @IsOptional()
  @IsIn(['LONG', 'SHORT'])
  position: string

  @IsOptional()
  @IsDateString()
  expiry: string

  @IsOptional()
  @IsCurrency()
  openPrice: number

  @IsOptional()
  @IsCurrency()
  closePrice: number

  @IsOptional()
  @IsCurrency()
  strike: number

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
  openPrice: number
  closePrice: number
  strike: number
  remarks?: string
}
