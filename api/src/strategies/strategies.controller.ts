import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'

import { SessionUser } from '../auth/auth.decorator'
import { AuthenticationGuard } from '../auth/authentication.guard'
import { User } from '../database/entities/user.entity'
import {
  CreateOptionTradeDto,
  UpdateOptionTradeDto,
} from '../dto/option-trade.dto'
import {
  CreateStockTradeDto,
  UpdateStockTradeDto,
} from '../dto/stock-trade.dto'
import {
  CreateStrategyRequestDto,
  GetAllStrategiesResponseDto,
  GetOptionTradesForStrategyResponseDto,
  GetStockTradesForStrategyResponseDto,
  GetStrategyResponseDto,
  UpdateStrategyRequestDto,
} from '../dto/strategy.dto'
import { OptionTradesService } from '../option-trades/option-trades.service'
import { StockTradesService } from '../stock-trades/stock-trades.service'
import { StrategiesService } from './strategies.service'

@UseGuards(AuthenticationGuard)
@Controller('strategies')
export class StrategiesController {
  constructor(
    private readonly strategiesService: StrategiesService,
    private readonly optionTradesService: OptionTradesService,
    private readonly stockTradesService: StockTradesService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllStrategies(
    @SessionUser() user: User,
  ): Promise<GetAllStrategiesResponseDto> {
    try {
      return await this.strategiesService.getAllStrategies(user.id)
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get(':strategyId')
  async getStrategy(
    @Param('strategyId') id: string,
  ): Promise<GetStrategyResponseDto> {
    try {
      return await this.strategiesService.getStrategy(id)
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createStrategy(
    @SessionUser() user: User | null,
    @Body() dto: CreateStrategyRequestDto,
  ) {
    if (!user) {
      throw new UnauthorizedException()
    }
    try {
      await this.strategiesService.createStrategy(user.id, dto)
      return { message: 'Created strategy.' }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put(':strategyId')
  async updateStrategy(
    @Param('strategyId') id: string,
    @Body() dto: UpdateStrategyRequestDto,
  ) {
    try {
      await this.strategiesService.updateStrategy(id, dto)
      return { message: 'Updated strategy.' }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':strategyId')
  async deleteStrategy(@Param('strategyId') id: string) {
    try {
      await this.strategiesService.deleteStrategy(id)
      return { message: 'Deleted strategy' }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  // OPTION TRADES
  @HttpCode(HttpStatus.OK)
  @Get(':strategyId/options')
  async getAllOptionTradesForStrategy(
    @Param('strategyId') strategyId: string,
  ): Promise<GetOptionTradesForStrategyResponseDto> {
    try {
      const optionTrades =
        await this.optionTradesService.getAllOptionTradesForStrategy(strategyId)
      return {
        id: strategyId,
        optionTrades,
      }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':strategyId/options')
  async createOptionTrade(
    @Param('strategyId') id: string,
    @Body() dto: CreateOptionTradeDto,
  ) {
    try {
      await this.optionTradesService.createOptionTrade(id, dto)
      return { message: 'Created option trade.' }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get(':strategyId/options/:optionTradeId')
  async getOptionTrade(@Param('optionTradeId') optionTradeId: string) {
    try {
      const trade = await this.optionTradesService.getOptionTrade(optionTradeId)
      if (!trade) {
        throw new NotFoundException()
      }
      return trade
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put(':strategyId/options/:optionTradeId')
  async updateOptionTrade(
    @Param('optionTradeId') optionTradeId: string,
    @Body() dto: UpdateOptionTradeDto,
  ) {
    try {
      await this.optionTradesService.updateOptionTrade(optionTradeId, dto)
      return { message: 'Updated option trade.' }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':strategyId/options/:optionTradeId')
  async deleteOptionTrade(@Param('optionTradeId') optionTradeId: string) {
    try {
      await this.optionTradesService.deleteOptionTrade(optionTradeId)
      return { message: 'Deleted option trade.' }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  // STOCK TRADES
  @HttpCode(HttpStatus.OK)
  @Get(':strategyId/stocks')
  async getAllStockTradesForStrategy(
    @Param('strategyId') strategyId: string,
  ): Promise<GetStockTradesForStrategyResponseDto> {
    try {
      const stockTrades =
        await this.stockTradesService.getAllStockTradesForStrategy(strategyId)
      return {
        id: strategyId,
        stockTrades,
      }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':strategyId/stocks')
  async createStockTrade(
    @Param('strategyId') id: string,
    @Body() dto: CreateStockTradeDto,
  ) {
    try {
      await this.stockTradesService.createStockTrade(id, dto)
      return { message: 'Created stock trade.' }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get(':strategyId/stocks/:stockTradeId')
  async getStockTrade(@Param('stockTradeId') stockTradeId: string) {
    try {
      const trade = await this.stockTradesService.getStockTrade(stockTradeId)
      if (!trade) {
        throw new NotFoundException()
      }
      return trade
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put(':strategyId/stocks/:stockTradeId')
  async updateStockTrade(
    @Param('stockTradeId') stockTradeId: string,
    @Body() dto: UpdateStockTradeDto,
  ) {
    try {
      await this.stockTradesService.updateStockTrade(stockTradeId, dto)
      return { message: 'Updated stock trade.' }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':strategyId/stocks/:stockTradeId')
  async deleteStockTrade(@Param('stockTradeId') stockTradeId: string) {
    try {
      await this.stockTradesService.deleteStockTrade(stockTradeId)
      return { message: 'Deleted stock trade.' }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }
}
