import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm'

import { OptionTrade } from '../entities/option-trade.entity'
import { StockTrade } from '../entities/stock-trade.entity'
import {
  getParentStrategyAndUserId,
  recomputeAndSaveAccountStats,
} from './utils'

@EventSubscriber()
export class StockTradeSubscriber
  implements EntitySubscriberInterface<StockTrade>
{
  listenTo() {
    return StockTrade
  }

  async afterInsert(event: InsertEvent<StockTrade>): Promise<void> {
    // Retrieve the account
    const { manager, entity } = event
    const { userId } = await getParentStrategyAndUserId(
      entity.id,
      manager,
      'stock',
    )

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
  }

  async afterUpdate(event: UpdateEvent<OptionTrade>): Promise<void> {
    // Retrieve the account
    const { manager, entity } = event
    const { userId } = await getParentStrategyAndUserId(
      entity.id as string,
      manager,
      'stock',
    )

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
  }

  async afterRemove(event: RemoveEvent<OptionTrade>): Promise<void> {
    // Retrieve the account
    const { manager, entity } = event
    const { userId } = await getParentStrategyAndUserId(
      entity.id,
      manager,
      'stock',
    )

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
  }

  async afterSoftRemove(event: SoftRemoveEvent<OptionTrade>): Promise<void> {
    // Retrieve the account
    const { manager, entity } = event
    const { userId } = await getParentStrategyAndUserId(
      entity.id,
      manager,
      'stock',
    )

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
  }
}
