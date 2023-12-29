import { LoginRequestDto } from '../../../api/src/dto/auth.dto'
import { post } from './common'

export const login = async (dto: LoginRequestDto) => {
  await post('auth/login', dto)
}

export const logout = async () => {
  await post('auth/logout', {})
}
