import { Injectable, NestMiddleware } from '@nestjs/common'
import { TypeormStore } from 'connect-typeorm'
import { NextFunction, Request, Response } from 'express'
import session from 'express-session'
import { DataSource } from 'typeorm'

import { ConfigService } from '../config/config.service'
import { Session } from '../database/entities/session.entity'

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const sessionMiddleware = session({
      secret: this.configService.get('auth.session.secret'),
      name: this.configService.get('auth.session.name'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: this.configService.get('auth.session.maxAge'),
        sameSite: 'strict',
        secure: this.configService.get('app.environment') === 'production',
      },
      store: new TypeormStore({
        cleanupLimit: 2,
      }).connect(this.dataSource.getRepository(Session)),
    })

    sessionMiddleware(req, res, next)
  }
}
