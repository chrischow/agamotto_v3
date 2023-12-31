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

@Injectable()
export class StrategiesService {
  constructor(
    @InjectRepository(Strategy)
    private readonly strategyRepo: Repository<Strategy>,
  ) {}

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
        createdAt: true,
        optionTrades: {
          id: true,
        },
        stockTrades: {
          id: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    })

    const strategies = allStrategies.map((strategy) => {
      const { id, name, description, createdAt, optionTrades, stockTrades } =
        strategy
      let optionsProfit = 0
      for (const optionTrade of optionTrades) {
        const positionMultiplier = optionTrade.position === 'LONG' ? 1 : -1
        if (optionTrade.closeDate && optionTrade.closePrice) {
          optionsProfit +=
            (optionTrade.closePrice - optionTrade.openPrice) *
            positionMultiplier *
            optionTrade.quantity *
            100
        }
      }

      let stocksProfit = 0
      for (const stockTrade of stockTrades) {
        const positionMultiplier = stockTrade.position === 'LONG' ? 1 : -1
        if (stockTrade.closeDate && stockTrade.closePrice) {
          stocksProfit +=
            (stockTrade.closePrice - stockTrade.openPrice) *
            positionMultiplier *
            stockTrade.quantity
        }
      }

      return {
        id,
        name,
        description,
        numOptionTrades: optionTrades.length,
        numStockTrades: stockTrades.length,
        optionsProfit,
        stocksProfit,
        createdAt: createdAt.toISOString(),
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
      },
      order: {
        optionTrades: {
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

  async createStrategy(userId: string, dto: CreateStrategyRequestDto) {
    await this.strategyRepo.insert({ ...dto, userId })
  }

  async updateStrategy(id: string, dto: UpdateStrategyRequestDto) {
    await this.strategyRepo.update({ id }, dto)
  }

  async deleteStrategy(id: string) {
    await this.strategyRepo.softDelete({ id })
  }
}
