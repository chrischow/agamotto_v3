import {
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common'

import { SessionUser } from '../auth/auth.decorator'
import { AuthenticationGuard } from '../auth/authentication.guard'
import { User } from '../database/entities/user.entity'
import { GetAccountDetailsResponseDto } from '../dto/account.dto'
import { AccountService } from './account.service'

@UseGuards(AuthenticationGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async getAccountDetails(
    @SessionUser() user: User,
  ): Promise<GetAccountDetailsResponseDto> {
    try {
      return await this.accountService.getAccountDetails(user)
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  @Post('update')
  async updateAccountStats(@SessionUser() user: User) {
    try {
      await this.accountService.updateAccountStats(user.id)
      return { message: 'Account stats updated.' }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }
}
