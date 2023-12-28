import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Strategy } from '../database/entities/strategy.entity'
import { OptionTradesModule } from '../option-trades/option-trades.module'
import { StockTradesModule } from '../stock-trades/stock-trades.module'
import { StrategiesController } from './strategies.controller'
import { StrategiesService } from './strategies.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Strategy]),
    OptionTradesModule,
    StockTradesModule,
  ],
  controllers: [StrategiesController],
  providers: [StrategiesService],
  exports: [StrategiesService],
})
export class StrategiesModule {}
