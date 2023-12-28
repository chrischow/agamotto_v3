import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { OptionTrade } from '../database/entities/option-trade.entity'
import {
  CreateOptionTradeDto,
  UpdateOptionTradeDto,
} from '../dto/option-trade.dto'

@Injectable()
export class OptionTradesService {
  constructor(
    @InjectRepository(OptionTrade)
    private readonly optionTradeRepo: Repository<OptionTrade>,
  ) {}

  // Get all
  async getAllOptionTrades(userId: string) {
    return await this.optionTradeRepo.find({ where: { strategy: { userId } } })
  }

  // Get all for strategy
  async getAllOptionTradesForStrategy(strategyId: string) {
    return await this.optionTradeRepo.find({ where: { strategyId } })
  }

  // Create
  async createOptionTrade(strategyId: string, dto: CreateOptionTradeDto) {
    await this.optionTradeRepo.insert({ ...dto, strategyId })
  }

  // Update
  async updateOptionTrade(dto: UpdateOptionTradeDto) {
    await this.optionTradeRepo.insert(dto)
  }

  // Delete
  async deleteOptionTrade(id: string) {
    await this.optionTradeRepo.softDelete({ id })
  }
}
