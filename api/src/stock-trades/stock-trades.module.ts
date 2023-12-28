import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StockTrade } from 'src/database/entities/stock-trade.entity'

import { StockTradesService } from './stock-trades.service'

@Module({
  imports: [TypeOrmModule.forFeature([StockTrade])],
  providers: [StockTradesService],
  exports: [StockTradesService],
})
export class StockTradesModule {}
