import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { StockTrade } from '../database/entities/stock-trade.entity'
import {
  CreateStockTradeDto,
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
  async getAllStockTradesForStrategy(strategyId: string) {
    return await this.stockTradeRepo.find({ where: { strategyId } })
  }

  // Create
  async createStockTrade(strategyId: string, dto: CreateStockTradeDto) {
    await this.stockTradeRepo.insert({ ...dto, strategyId })
  }

  // Update
  async updateStockTrade(dto: UpdateStockTradeDto) {
    const { id, ...stockTrade } = dto
    await this.stockTradeRepo.update({ id }, stockTrade)
  }

  // Delete
  async deleteStockTrade(id: string) {
    await this.stockTradeRepo.softDelete({ id })
  }
}
