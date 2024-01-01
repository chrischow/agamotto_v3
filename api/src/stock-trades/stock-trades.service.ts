import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { StockTrade } from '../database/entities/stock-trade.entity'
import {
  CreateStockTradeDto,
  GetStockTradeDetailResponseDto,
  StockTradeDetail,
  UpdateStockTradeDto,
} from '../dto/stock-trade.dto'
import { computeStockTradesStats } from './stock-trades.utils'

@Injectable()
export class StockTradesService {
  constructor(
    @InjectRepository(StockTrade)
    private readonly stockTradeRepo: Repository<StockTrade>,
  ) {}

  // Get all
  async getAllStockTrades(userId: string) {
    return await this.stockTradeRepo.find({ where: { strategy: { userId } } })
  }

  // Get all for strategy
  async getAllStockTradesForStrategy(
    strategyId: string,
  ): Promise<StockTradeDetail[]> {
    return await this.stockTradeRepo.find({ where: { strategyId } })
  }

  // Create
  async createStockTrade(strategyId: string, dto: CreateStockTradeDto) {
    await this.stockTradeRepo.insert({ ...dto, strategyId })
  }

  // Read
  async getStockTrade(id: string): Promise<GetStockTradeDetailResponseDto> {
    const trade = await this.stockTradeRepo.findOne({ where: { id } })
    return {
      ...trade,
      openDate: trade.openDate.toISOString(),
      closeDate: trade.closeDate?.toISOString(),
    }
  }

  // Update
  async updateStockTrade(id: string, dto: UpdateStockTradeDto) {
    await this.stockTradeRepo.update({ id }, dto)
  }

  // Delete
  async deleteStockTrade(id: string) {
    await this.stockTradeRepo.softRemove({ id })
  }

  computeStockTradesStats(trades: StockTrade[]) {
    return computeStockTradesStats(trades)
  }
}
