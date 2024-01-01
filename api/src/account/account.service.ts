import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OptionTrade } from 'src/database/entities/option-trade.entity'
import { StockTrade } from 'src/database/entities/stock-trade.entity'
import { Repository } from 'typeorm'

import { Account } from '../database/entities/account.entity'
import { User } from '../database/entities/user.entity'
import { GetAccountDetailsResponseDto, StatsByTicker } from '../dto/account.dto'
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
    const accountDetails = await this.accountRepo.findOne({
      where: { id: user.id },
    })
    const tickers = await this.getTradesStats(user.id)

    return {
      ...accountDetails,
      tickers,
    }
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
      openStocksProfit,
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
    account.openStocksProfit = openStocksProfit
    account.realisedStocksProfit = realisedStocksProfit
    account.numberOfOpenStockTrades = numberOfOpenStockTrades
    account.numberOfClosedStockTrades = numberOfClosedStockTrades

    await this.accountRepo.save(account)
  }

  async getTradesStats(userId: string): Promise<StatsByTicker[]> {
    const allOptionTrades = await this.optionTradesService.getAllOptionTrades(
      userId,
    )
    const allStockTrades = await this.stockTradesService.getAllStockTrades(
      userId,
    )

    const tickers: {
      [key: string]: { options: OptionTrade[]; stocks: StockTrade[] }
    } = {}
    for (const optionTrade of allOptionTrades) {
      const { ticker } = optionTrade
      if (!(ticker in tickers)) {
        tickers[ticker] = { options: [], stocks: [] }
      }
      tickers[ticker].options.push(optionTrade)
    }

    for (const stockTrade of allStockTrades) {
      const { ticker } = stockTrade
      if (!(ticker in tickers)) {
        tickers[ticker] = { options: [], stocks: [] }
      }
      tickers[ticker].stocks.push(stockTrade)
    }

    // Output
    const tickerStats: StatsByTicker[] = []
    for (const ticker in tickers) {
      const {
        openOptionsProfit,
        realisedOptionsProfit,
        numberOfOpenPutTrades,
        numberOfClosedPutTrades,
        numberOfOpenCallTrades,
        numberOfClosedCallTrades,
      } = this.optionTradesService.computeOptionTradesStats(
        tickers[ticker].options,
      )

      const {
        openStocksProfit,
        realisedStocksProfit,
        numberOfOpenStockTrades,
        numberOfClosedStockTrades,
      } = this.stockTradesService.computeStockTradesStats(
        tickers[ticker].stocks,
      )

      tickerStats.push({
        ticker,
        openOptionsProfit,
        realisedOptionsProfit,
        numberOfOpenPutTrades,
        numberOfClosedPutTrades,
        numberOfOpenCallTrades,
        numberOfClosedCallTrades,
        openStocksProfit,
        realisedStocksProfit,
        numberOfOpenStockTrades,
        numberOfClosedStockTrades,
      })
    }

    tickerStats.sort((a, b) => {
      if (a.ticker < b.ticker) {
        return -1
      } else if (a.ticker > b.ticker) {
        return 1
      }
      return 0
    })

    return tickerStats
  }
}
