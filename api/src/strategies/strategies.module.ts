import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Strategy } from 'src/database/entities/strategy.entity'
import { OptionTradesModule } from 'src/option-trades/option-trades.module'
import { StockTradesModule } from 'src/stock-trades/stock-trades.module'

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
