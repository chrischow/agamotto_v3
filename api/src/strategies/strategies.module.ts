import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Strategy } from 'src/database/entities/strategy.entity'

import { StrategiesController } from './strategies.controller'
import { StrategiesService } from './strategies.service'

@Module({
  imports: [TypeOrmModule.forFeature([Strategy])],
  controllers: [StrategiesController],
  providers: [StrategiesService],
  exports: [StrategiesService],
})
export class StrategiesModule {}
