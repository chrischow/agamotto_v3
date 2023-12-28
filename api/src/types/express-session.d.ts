import { User } from 'src/database/entities/user.entity'

declare module 'express-session' {
  interface SessionData {
    user?: User
  }
}
