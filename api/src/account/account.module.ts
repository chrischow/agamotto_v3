import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Account } from '../database/entities/account.entity'
import { OptionTradesModule } from '../option-trades/option-trades.module'
import { StockTradesModule } from '../stock-trades/stock-trades.module'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    OptionTradesModule,
    StockTradesModule,
  ],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
