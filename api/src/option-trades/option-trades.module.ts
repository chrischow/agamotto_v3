import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OptionTrade } from '../database/entities/option-trade.entity'
import { OptionTradesService } from './option-trades.service'

@Module({
  imports: [TypeOrmModule.forFeature([OptionTrade])],
  providers: [OptionTradesService],
  exports: [OptionTradesService],
})
export class OptionTradesModule {}
