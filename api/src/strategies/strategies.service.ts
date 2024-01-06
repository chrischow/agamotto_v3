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
      const { id, name, description, optionTrades, stockTrades } = strategy
      let executedAt: Date = new Date()
      let optionsProfit = 0
      for (const optionTrade of optionTrades) {
        const {
          closeDate,
          closePrice,
          openPrice,
          quantity,
          position,
          openDate,
        } = optionTrade
        const positionMultiplier = position === 'LONG' ? 1 : -1
        if (closeDate != null && closePrice != null) {
          optionsProfit +=
            (closePrice - openPrice) * positionMultiplier * quantity * 100
        }
        // Update executed date
        if (
          (executedAt && openDate.getTime() < executedAt.getTime()) ||
          !executedAt
        ) {
          executedAt = openDate
        }
      }

      let stocksProfit = 0
      for (const stockTrade of stockTrades) {
        const {
          closeDate,
          closePrice,
          openPrice,
          quantity,
          position,
          openDate,
        } = stockTrade
        const positionMultiplier = position === 'LONG' ? 1 : -1
        if (closeDate != null && closePrice != null) {
          stocksProfit +=
            (closePrice - openPrice) * positionMultiplier * quantity
        }
        // Update executed date
        if (
          (executedAt && openDate.getTime() < executedAt.getTime()) ||
          !executedAt
        ) {
          executedAt = openDate
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
        executedAt: executedAt.toISOString(),
      }
    })

    strategies.sort((a, b) => {
      return new Date(b.executedAt).getTime() - new Date(a.executedAt).getTime()
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
}
