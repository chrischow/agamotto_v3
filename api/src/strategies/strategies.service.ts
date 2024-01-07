import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Strategy } from '../database/entities/strategy.entity'
import {
  CreateStrategyRequestDto,
  GetAllStrategiesResponseDto,
  GetStrategyResponseDto,
  UpdateStrategyRequestDto,
} from '../dto/strategy.dto'
import { OptionTradesService } from '../option-trades/option-trades.service'
import { StockTradesService } from '../stock-trades/stock-trades.service'

@Injectable()
export class StrategiesService {
  constructor(
    @InjectRepository(Strategy)
    private readonly strategyRepo: Repository<Strategy>,
    private readonly optionTradesService: OptionTradesService,
    private readonly stockTradesService: StockTradesService,
  ) {}
  async getAllStrategiesWithTrades(userId: string) {
    return await this.strategyRepo.find({
      where: { userId },
      relations: {
        optionTrades: true,
        stockTrades: true,
      },
    })
  }

  async getAllStrategies(userId: string): Promise<GetAllStrategiesResponseDto> {
    const allStrategies = await this.strategyRepo.find({
      where: { userId },
      relations: {
        optionTrades: true,
        stockTrades: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        openOptionsProfit: true,
        openStocksProfit: true,
        realisedOptionsProfit: true,
        realisedStocksProfit: true,
        optionTrades: {
          id: true,
          openPrice: true,
          openDate: true,
          closeDate: true,
          closePrice: true,
          quantity: true,
          position: true,
        },
        stockTrades: {
          id: true,
          openPrice: true,
          openDate: true,
          closeDate: true,
          closePrice: true,
          quantity: true,
          position: true,
        },
      },
    })

    const strategies = allStrategies.map((strategy) => {
      const {
        id,
        name,
        description,
        optionTrades,
        stockTrades,
        openOptionsProfit,
        openStocksProfit,
        realisedOptionsProfit,
        realisedStocksProfit,
      } = strategy

      let executedAt: Date = undefined
      let lastActivity: Date = undefined
      // let totalProfit = 0
      for (const optionTrade of optionTrades) {
        const { closeDate, openDate } = optionTrade

        // Update executed date
        if (!executedAt) {
          executedAt = openDate
        } else if (openDate.getTime() < executedAt.getTime()) {
          executedAt = openDate
        }

        // Update last activity date
        if (!lastActivity) {
          if (closeDate) {
            lastActivity = closeDate
          } else {
            lastActivity = openDate
          }
        } else if (closeDate && closeDate.getTime() > lastActivity.getTime()) {
          lastActivity = closeDate
        } else if (openDate.getTime() > lastActivity.getTime()) {
          lastActivity = openDate
        }
      }

      for (const stockTrade of stockTrades) {
        const { closeDate, openDate } = stockTrade
        // Update executed date
        if (!executedAt) {
          executedAt = openDate
        } else if (openDate.getTime() < executedAt.getTime()) {
          executedAt = openDate
        }

        // Update last activity date
        if (!lastActivity) {
          if (closeDate) {
            lastActivity = closeDate
          } else {
            lastActivity = openDate
          }
        } else if (closeDate && closeDate.getTime() > lastActivity.getTime()) {
          lastActivity = closeDate
        } else if (openDate.getTime() > lastActivity.getTime()) {
          lastActivity = openDate
        }
      }

      return {
        id,
        name,
        description,
        numOptionTrades: optionTrades.length,
        numStockTrades: stockTrades.length,
        totalOpenProfit: openOptionsProfit + openStocksProfit,
        totalRealisedProfit: realisedOptionsProfit + realisedStocksProfit,
        executedAt: executedAt.toISOString(),
        lastActivity: lastActivity.toISOString(),
      }
    })

    strategies.sort((a, b) => {
      const aExecutedAt = new Date(a.executedAt).getTime()
      const aLastActivity = new Date(a.lastActivity).getTime()
      const bExecutedAt = new Date(b.executedAt).getTime()
      const bLastActivity = new Date(b.lastActivity).getTime()
      if (aLastActivity !== bLastActivity) {
        return bLastActivity - aLastActivity
      } else {
        return bExecutedAt - aExecutedAt
      }
    })

    return { strategies }
  }

  async getStrategy(strategyId: string): Promise<GetStrategyResponseDto> {
    return await this.strategyRepo.findOne({
      where: { id: strategyId },
      relations: { optionTrades: true, stockTrades: true },
      select: {
        id: true,
        name: true,
        description: true,
        openOptionsProfit: true,
        realisedOptionsProfit: true,
        openStocksProfit: true,
        realisedStocksProfit: true,
        numOpenPuts: true,
        numClosedPuts: true,
        numOpenCalls: true,
        numClosedCalls: true,
        numOpenStockTrades: true,
        numClosedStockTrades: true,
      },
      order: {
        optionTrades: {
          expiry: 'DESC',
          openDate: 'DESC',
          ticker: 'ASC',
        },
        stockTrades: {
          openDate: 'DESC',
          ticker: 'ASC',
        },
      },
    })
  }

  async createStrategy(
    userId: string,
    dto: CreateStrategyRequestDto,
  ): Promise<string> {
    const newStrategy = this.strategyRepo.create({ ...dto, userId })
    await this.strategyRepo.save(newStrategy)
    return newStrategy.id
  }

  async updateStrategy(id: string, dto: UpdateStrategyRequestDto) {
    await this.strategyRepo.update({ id }, dto)
  }

  async deleteStrategy(id: string) {
    const strategy = await this.strategyRepo.findOne({
      where: { id },
      relations: { optionTrades: true, stockTrades: true },
    })

    await this.strategyRepo.softRemove(strategy)
  }

  async updateAllStrategyStats(userId: string) {
    const strategies = await this.getAllStrategiesWithTrades(userId)
    for (const strategy of strategies) {
      const {
        openOptionsProfit,
        realisedOptionsProfit,
        numOpenPuts,
        numClosedPuts,
        numOpenCalls,
        numClosedCalls,
      } = this.optionTradesService.computeOptionTradesStats(
        strategy.optionTrades,
      )

      const {
        openStocksProfit,
        realisedStocksProfit,
        numOpenStockTrades,
        numClosedStockTrades,
      } = this.stockTradesService.computeStockTradesStats(strategy.stockTrades)

      strategy.openOptionsProfit = Math.round(openOptionsProfit * 100) / 100
      strategy.realisedOptionsProfit =
        Math.round(realisedOptionsProfit * 100) / 100
      strategy.openStocksProfit = Math.round(openStocksProfit * 100) / 100
      strategy.realisedStocksProfit =
        Math.round(realisedStocksProfit * 100) / 100
      strategy.numOpenPuts = numOpenPuts
      strategy.numClosedPuts = numClosedPuts
      strategy.numOpenCalls = numOpenCalls
      strategy.numClosedCalls = numClosedCalls
      strategy.numOpenStockTrades = numOpenStockTrades
      strategy.numClosedStockTrades = numClosedStockTrades

      await this.strategyRepo.save(strategy)
    }
  }
}
