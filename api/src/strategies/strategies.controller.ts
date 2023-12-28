import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { AuthenticationGuard } from 'src/auth/authentication.guard'

import { SessionUser } from '../auth/auth.decorator'
import { User } from '../database/entities/user.entity'
import {
  CreateStrategyRequestDto,
  GetAllStrategiesResponseDto,
  GetStrategyResponseDto,
  UpdateStrategyRequestDto,
} from '../dto/strategy.dto'
import { StrategiesService } from './strategies.service'

@UseGuards(AuthenticationGuard)
@Controller('strategies')
export class StrategiesController {
  constructor(private readonly strategiesService: StrategiesService) {}

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
}
