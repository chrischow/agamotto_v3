import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { format } from 'date-fns'
import { OptionTrade } from 'src/database/entities/option-trade.entity'
import { StockTrade } from 'src/database/entities/stock-trade.entity'
import { Repository } from 'typeorm'

import { Account } from '../database/entities/account.entity'
import { User } from '../database/entities/user.entity'
import {
  GetAccountDetailsResponseDto,
  ProfitHistory,
  StatsByTicker,
  TradeStats,
} from '../dto/account.dto'
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
    const tradeStats = await this.getTradesStats(user.id)

    return {
      ...accountDetails,
      tradeStats,
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
      numOpenPuts,
      numClosedPuts,
      numOpenCalls,
      numClosedCalls,
    } = this.optionTradesService.computeOptionTradesStats(allOptionTrades)

    const allStockTrades = await this.stockTradesService.getAllStockTrades(
      userId,
    )

    const {
      openStocksProfit,
      realisedStocksProfit,
      numOpenStockTrades,
      numClosedStockTrades,
    } = this.stockTradesService.computeStockTradesStats(allStockTrades)

    // Update account
    account.openOptionsProfit = openOptionsProfit
    account.realisedOptionsProfit = realisedOptionsProfit
    account.numOpenPuts = numOpenPuts
    account.numClosedPuts = numClosedPuts
    account.numOpenCalls = numOpenCalls
    account.numClosedCalls = numClosedCalls
    account.openStocksProfit = openStocksProfit
    account.realisedStocksProfit = realisedStocksProfit
    account.numOpenStockTrades = numOpenStockTrades
    account.numClosedStockTrades = numClosedStockTrades

    await this.accountRepo.save(account)
  }

  async getTradesStats(userId: string): Promise<TradeStats> {
    const allOptionTrades = await this.optionTradesService.getAllOptionTrades(
      userId,
    )
    const allStockTrades = await this.stockTradesService.getAllStockTrades(
      userId,
    )

    const profitHistory: ProfitHistory = {}

    const tickers: {
      [key: string]: { options: OptionTrade[]; stocks: StockTrade[] }
    } = {}
    for (const optionTrade of allOptionTrades) {
      const {
        ticker,
        openDate,
        closeDate,
        closePrice,
        openPrice,
        quantity,
        position,
      } = optionTrade
      const positionMultiplier = position === 'LONG' ? 1 : -1
      // Tickers
      if (!(ticker in tickers)) {
        tickers[ticker] = { options: [], stocks: [] }
      }
      tickers[ticker].options.push(optionTrade)

      // History
      if (closePrice != null && closeDate != null) {
        const dateStr = `${format(closeDate, 'yyyy-MM')}-01`
        const profit =
          (closePrice - openPrice) * positionMultiplier * quantity * 100
        if (!(dateStr in profitHistory)) {
          profitHistory[dateStr] = {
            realised: {
              options: 0,
              stocks: 0,
            },
            open: {
              options: 0,
              stocks: 0,
            },
          }
        }
        profitHistory[dateStr].realised.options += profit
      } else {
        const dateStr = `${format(openDate, 'yyyy-MM')}-01`
        const profit = (0 - openPrice) * positionMultiplier * quantity * 100
        if (!(dateStr in profitHistory)) {
          profitHistory[dateStr] = {
            realised: {
              options: 0,
              stocks: 0,
            },
            open: {
              options: 0,
              stocks: 0,
            },
          }
        }
        profitHistory[dateStr].open.options += profit
      }
    }

    for (const stockTrade of allStockTrades) {
      const {
        ticker,
        openDate,
        closeDate,
        closePrice,
        openPrice,
        quantity,
        position,
      } = stockTrade
      const positionMultiplier = position === 'LONG' ? 1 : -1
      // Tickers
      if (!(ticker in tickers)) {
        tickers[ticker] = { options: [], stocks: [] }
      }
      tickers[ticker].stocks.push(stockTrade)

      // History
      if (closePrice != null && closeDate != null) {
        const profit = (closePrice - openPrice) * positionMultiplier * quantity
        const dateStr = `${format(closeDate, 'yyyy-MM')}-01`
        if (!(dateStr in profitHistory)) {
          profitHistory[dateStr] = {
            realised: {
              options: 0,
              stocks: 0,
            },
            open: {
              options: 0,
              stocks: 0,
            },
          }
        }
        profitHistory[dateStr].realised.stocks += profit
      } else {
        const dateStr = `${format(openDate, 'yyyy-MM')}-01`
        const profit = (0 - openPrice) * positionMultiplier * quantity
        if (!(dateStr in profitHistory)) {
          profitHistory[dateStr] = {
            realised: {
              options: 0,
              stocks: 0,
            },
            open: {
              options: 0,
              stocks: 0,
            },
          }
        }
        profitHistory[dateStr].open.stocks += profit
      }
    }

    // Output
    const tickerStats: StatsByTicker[] = []
    for (const ticker in tickers) {
      const {
        openOptionsProfit,
        realisedOptionsProfit,
        numOpenPuts,
        numClosedPuts,
        numOpenCalls,
        numClosedCalls,
      } = this.optionTradesService.computeOptionTradesStats(
        tickers[ticker].options,
      )

      const {
        openStocksProfit,
        realisedStocksProfit,
        numOpenStockTrades,
        numClosedStockTrades,
      } = this.stockTradesService.computeStockTradesStats(
        tickers[ticker].stocks,
      )

      tickerStats.push({
        ticker,
        openOptionsProfit,
        realisedOptionsProfit,
        numOpenPuts,
        numClosedPuts,
        numOpenCalls,
        numClosedCalls,
        openStocksProfit,
        realisedStocksProfit,
        numOpenStockTrades,
        numClosedStockTrades,
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

    return { tickers: tickerStats, profitHistory }
  }
}
