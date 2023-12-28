import 'reflect-metadata'

import convict from 'convict'
import { join } from 'path'
import { DataSourceOptions } from 'typeorm'

import { schema } from '../config/schema'

const config = convict(schema)

export const baseConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.get('db.host'),
  port: config.get('db.port'),
  username: config.get('db.username'),
  password: config.get('db.password'),
  database: config.get('db.name'),
  entities: [join(__dirname, 'entities', '*.entity{.js,.ts}')],
  subscribers: [join(__dirname, 'subscribers', '*.subscriber{.js,.ts}')],
  synchronize: config.get('app.environment') !== 'production',
}
