import { GetAccountDetailsResponseDto } from '../../../api/src/dto/account.dto'
import { get, post } from './common'

export const getAccountDetails =
  async (): Promise<GetAccountDetailsResponseDto> => {
    return await get(`account`)
  }

export const updateAccountStats = async () => {
  return await post(`account/update`, {})
}
