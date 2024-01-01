import { GetAccountDetailsResponseDto } from '../../../api/src/dto/account.dto'
import { get } from './common'

export const getAccountDetails =
  async (): Promise<GetAccountDetailsResponseDto> => {
    return await get(`account`)
  }
