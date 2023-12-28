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
        },
        stockTrades: {
          id: true,
        },
      },
    })

    return {
      strategies: allStrategies.map((strategy) => {
        const { id, name, description, optionTrades, stockTrades } = strategy
        return {
          id,
          name,
          description,
          numOptionTrades: optionTrades.length,
          numStockTrades: stockTrades.length,
        }
      }),
    }
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
