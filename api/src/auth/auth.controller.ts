import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  Session,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { ConfigService } from 'src/config/config.service'

import { LoginRequestDto, SignupRequestDto } from '../dto/auth.dto'
import { UserSession } from '../types/session'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignupRequestDto) {
    const { email, password, passwordDuplicate } = dto
    if (password !== passwordDuplicate) {
      throw new BadRequestException('Passwords do not match.')
    }

    try {
      const newUser = await this.authService.signup(email, password)
      if (!newUser) {
        throw new BadRequestException('Could not create user.')
      }
      return { message: 'User created.' }
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginRequestDto, @Req() req: Request) {
    const { email, password } = dto
    const user = await this.authService.login(email, password)

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.')
    }

    // Create session
    req.session.user = user
    return {
      message: 'User logged in successfully.',
    }
  }

  @Post('logout')
  logout(@Session() session: UserSession, @Res() res: Response) {
    res.clearCookie(this.configService.get('auth.session.name'))
    session.destroy(() =>
      res.status(HttpStatus.OK).json({ message: 'User logged out.' }),
    )
  }
}
