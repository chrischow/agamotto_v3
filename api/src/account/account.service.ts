import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Account } from '../database/entities/account.entity'
import { User } from '../database/entities/user.entity'
import { GetAccountDetailsResponseDto } from '../dto/account.dto'
import { OptionTradesService } from '../option-trades/option-trades.service'
import { StockTradesService } from '../stock-trades/stock-trades.service'

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    private readonly optionTradesService: OptionTradesService,
    private readonly stockTradesService: StockTradesService,
  ) {}

  async getAccountDetails(user: User): Promise<GetAccountDetailsResponseDto> {
    return await this.accountRepo.findOne({ where: { id: user.id } })
  }

  async updateAccountStats(userId: string) {
    const account = await this.accountRepo.findOne({ where: { id: userId } })

    const allOptionTrades = await this.optionTradesService.getAllOptionTrades(
      userId,
    )

    const {
      openOptionsProfit,
      realisedOptionsProfit,
      numberOfOpenPutTrades,
      numberOfClosedPutTrades,
      numberOfOpenCallTrades,
      numberOfClosedCallTrades,
    } = this.optionTradesService.computeOptionTradesStats(allOptionTrades)

    const allStockTrades = await this.stockTradesService.getAllStockTrades(
      userId,
    )

    const {
      openStocksPosition,
      realisedStocksProfit,
      numberOfOpenStockTrades,
      numberOfClosedStockTrades,
    } = this.stockTradesService.computeStockTradesStats(allStockTrades)

    // Update account
    account.openOptionsProfit = openOptionsProfit
    account.realisedOptionsProfit = realisedOptionsProfit
    account.numberOfOpenPutTrades = numberOfOpenPutTrades
    account.numberOfClosedPutTrades = numberOfClosedPutTrades
    account.numberOfOpenCallTrades = numberOfOpenCallTrades
    account.numberOfClosedCallTrades = numberOfClosedCallTrades
    account.openStocksPosition = openStocksPosition
    account.realisedStocksProfit = realisedStocksProfit
    account.numberOfOpenStockTrades = numberOfOpenStockTrades
    account.numberOfClosedStockTrades = numberOfClosedStockTrades

    await this.accountRepo.save(account)
  }
}
