import {
  IsCurrency,
  IsDateString,
  IsIn,
  IsInt,
  IsString,
  IsUUID,
} from 'class-validator'

export class CreateStockTradeDto {
  @IsString()
  ticker: string

  @IsInt()
  quantity: number

  @IsIn(['LONG', 'SHORT'])
  position: string

  @IsCurrency()
  openPrice: number

  @IsCurrency()
  closePrice: number

  @IsString()
  remarks?: string
}

export class UpdateStockTradeDto {
  @IsUUID()
  id: string

  @IsString()
  ticker?: string

  @IsInt()
  quantity?: number

  @IsIn(['LONG', 'SHORT'])
  position?: string

  @IsCurrency()
  openPrice?: number

  @IsCurrency()
  closePrice?: number

  @IsString()
  remarks?: string
}
