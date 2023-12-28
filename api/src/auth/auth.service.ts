import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import bcrypt from 'bcryptjs'
import { Repository } from 'typeorm'

import { ConfigService } from '../config/config.service'
import { User } from '../database/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async signup(email: string, password: string): Promise<User | null> {
    const existingUser = await this.userRepo.findOne({
      where: {
        email,
      },
    })

    if (existingUser) {
      return null
    }

    // Hash password
    const salt = await bcrypt.genSalt(
      this.configService.get('auth.numSaltRounds'),
    )
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = this.userRepo.create({ email, password: hashedPassword })
    await this.userRepo.save(newUser)
    return newUser
  }

  async login(email: string, password: string): Promise<User | null> {
    // Retrieve user
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    // Check password
    const isAuthenticated = await bcrypt.compare(password, user.password)
    if (isAuthenticated) {
      return user
    }
    return null
  }
}
