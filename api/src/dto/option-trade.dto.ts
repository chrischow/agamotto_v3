import {
  IsCurrency,
  IsDateString,
  IsIn,
  IsInt,
  IsString,
  IsUUID,
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

export class UpdateOptionTradeDto {
  @IsUUID()
  id: string

  @IsString()
  ticker?: string

  @IsIn(['PUT', 'CALL'])
  instrument?: string

  @IsInt()
  quantity?: number

  @IsIn(['LONG', 'SHORT'])
  position?: string

  @IsDateString()
  expiry?: string

  @IsCurrency()
  openPrice?: number

  @IsCurrency()
  closePrice?: number

  @IsCurrency()
  strike?: number

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
