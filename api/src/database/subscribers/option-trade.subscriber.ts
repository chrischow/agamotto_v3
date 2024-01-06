import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm'

import { Account } from '../entities/account.entity'
import { OptionTrade } from '../entities/option-trade.entity'
import { getUserId, recomputeAndSaveAccountStats } from './utils'

@EventSubscriber()
export class OptionTradeSubscriber
  implements EntitySubscriberInterface<OptionTrade>
{
  listenTo() {
    return OptionTrade
  }
  async afterInsert(event: InsertEvent<OptionTrade>): Promise<void> {
    // Retrieve the account
    const { manager, entity } = event
    const userId = await getUserId(entity.id, manager, 'option')

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
  }

  async afterUpdate(event: UpdateEvent<OptionTrade>): Promise<void> {
    // Retrieve the account
    const { manager, entity } = event
    const userId = await getUserId(entity.id as string, manager, 'option')

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
  }

  async afterRemove(event: RemoveEvent<OptionTrade>): Promise<void> {
    // Retrieve the account
    const { manager, entity } = event
    const userId = await getUserId(entity.id, manager, 'option')

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
  }

  async afterSoftRemove(event: SoftRemoveEvent<OptionTrade>): Promise<void> {
    // Retrieve the account
    const { manager, entity } = event
    const userId = await getUserId(entity.id, manager, 'option')

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
  }
}
