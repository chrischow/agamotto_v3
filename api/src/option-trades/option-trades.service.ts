import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { OptionTrade } from '../database/entities/option-trade.entity'
import {
  CreateOptionTradeDto,
  GetOptionTradeDetailResponseDto,
  OptionTradeDetail,
  UpdateOptionTradeDto,
} from '../dto/option-trade.dto'
import { computeOptionTradesStats } from './option-trades.utils'

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
  async getAllOptionTradesForStrategy(
    strategyId: string,
  ): Promise<OptionTradeDetail[]> {
    return await this.optionTradeRepo.find({ where: { strategyId } })
  }

  // Create
  async createOptionTrade(strategyId: string, dto: CreateOptionTradeDto) {
    await this.optionTradeRepo.insert({ ...dto, strategyId })
  }

  // Read
  async getOptionTrade(id: string): Promise<GetOptionTradeDetailResponseDto> {
    const trade = await this.optionTradeRepo.findOne({ where: { id } })
    return {
      ...trade,
      expiry: trade.expiry.toISOString(),
      openDate: trade.openDate.toISOString(),
      closeDate: trade.closeDate?.toISOString(),
    }
  }

  // Update
  async updateOptionTrade(id: string, dto: UpdateOptionTradeDto) {
    await this.optionTradeRepo.update({ id }, dto)
  }

  // Delete
  async deleteOptionTrade(id: string) {
    await this.optionTradeRepo.softRemove({ id })
  }

  computeOptionTradesStats(trades: OptionTrade[]) {
    return computeOptionTradesStats(trades)
  }
}
