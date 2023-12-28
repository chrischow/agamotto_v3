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
  auth: {
    numSaltRounds: number
    session: {
      secret: string
      name: string
      maxAge: number
    }
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
      format: String,
      default: 'localhost',
    },
    username: {
      env: 'DB_USERNAME',
      sensitive: true,
      format: String,
      default: '',
      nullable: false,
    },
    password: {
      env: 'DB_PASSWORD',
      sensitive: true,
      format: String,
      default: '',
      nullable: false,
    },
    name: {
      env: 'DB_NAME',
      format: String,
      default: 'agamotto',
      nullable: false,
    },
  },
  auth: {
    numSaltRounds: {
      env: 'NUM_SALT_ROUNDS',
      format: 'int',
      default: 10,
    },
    session: {
      secret: {
        env: 'SESSION_SECRET',
        format: String,
        default: 'super-secret-secret',
      },
      name: {
        env: 'SESSION_NAME',
        format: String,
        default: 'agamotto.sid',
      },
      maxAge: {
        env: 'SESSION_COOKIE_MAX_AGE',
        format: 'int',
        default: 24 * 60 * 60 * 1000,
      },
    },
  },
}
