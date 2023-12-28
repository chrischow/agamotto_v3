import { join } from 'path'
import { DataSource } from 'typeorm'

import { baseConfig } from './dbConfig'

export const appDataSource = new DataSource({
  ...baseConfig,
  migrations: [join(__dirname, 'migrations', '*{.js,.ts}')],
})
