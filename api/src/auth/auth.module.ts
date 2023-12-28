import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from 'src/config/config.module'
import { User } from 'src/database/entities/user.entity'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
