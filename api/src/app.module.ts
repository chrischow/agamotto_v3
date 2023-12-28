import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from './config/config.module'
import { baseConfig } from './database/dbConfig'
import { HealthModule } from './health/health.module'
import { SessionMiddleware } from './middleware/session.middleware'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => baseConfig,
    }),
    HealthModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(SessionMiddleware).forRoutes('*')
  }
}
