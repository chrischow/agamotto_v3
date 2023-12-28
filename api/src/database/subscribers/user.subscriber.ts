import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm'

import { Account } from '../entities/account.entity'
import { User } from '../entities/user.entity'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User
  }

  async afterInsert(event: InsertEvent<User>): Promise<void> {
    const { manager, entity } = event
    const accountRepo = manager.getRepository(Account)
    await accountRepo.insert({ id: entity.id })
  }
}
