import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { StockTrade } from '../database/entities/stock-trade.entity'
import {
  CreateStockTradeDto,
  StockTradeDetail,
  UpdateStockTradeDto,
} from '../dto/stock-trade.dto'

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

  // Update
  async updateStockTrade(id: string, dto: UpdateStockTradeDto) {
    await this.stockTradeRepo.update({ id }, dto)
  }

  // Delete
  async deleteStockTrade(id: string) {
    await this.stockTradeRepo.softDelete({ id })
  }
}
