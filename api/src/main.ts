import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { ConfigService } from './config/config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api/v1')
  app.useGlobalPipes(new ValidationPipe())
  const config = app.get(ConfigService)
  await app.listen(config.get('app.port'))
}
bootstrap().catch((error) => console.error(error))
