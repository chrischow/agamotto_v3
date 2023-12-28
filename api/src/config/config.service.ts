import { Injectable } from '@nestjs/common'
import convict, { Config, Path } from 'convict'

import { ConfigSchema, schema } from './schema'

@Injectable()
export class ConfigService {
  config: Config<ConfigSchema>

  constructor() {
    this.config = convict(schema)
    this.config.validate()
  }

  get<K extends Path<ConfigSchema>>(key: K) {
    return this.config.get(key)
  }
}
