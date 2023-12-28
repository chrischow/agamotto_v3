import { Schema } from 'convict'

export interface ConfigSchema {
  app: {
    port: number
    domain: string
    environment: 'development' | 'test' | 'production'
  }
  db: {
    host: string
    username: string
    password: string
    port: number
    name: string
  }
}

export const schema: Schema<ConfigSchema> = {
  app: {
    port: {
      env: 'PORT',
      format: 'int',
      default: 10000,
    },
    domain: {
      env: 'DOMAIN',
      default: 'http://localhost:3000',
      nullable: false,
    },
    environment: {
      env: 'NODE_ENV',
      format: ['development', 'test', 'production'],
      default: 'development',
    },
  },
  db: {
    port: {
      env: 'DB_PORT',
      format: 'int',
      default: 5432,
    },
    host: {
      env: 'DB_HOST',
      default: 'localhost',
    },
    username: {
      env: 'DB_USERNAME',
      sensitive: true,
      default: '',
      nullable: false,
    },
    password: {
      env: 'DB_PASSWORD',
      sensitive: true,
      default: '',
      nullable: false,
    },
    name: {
      env: 'DB_NAME',
      default: 'agamotto',
      nullable: false,
    },
  },
}
