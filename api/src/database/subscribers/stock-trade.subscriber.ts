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
  recomputeAndSaveStrategyStats,
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
    const { userId, strategyId } = await getParentStrategyAndUserId(
      entity.id,
      manager,
      'stock',
    )

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
    await recomputeAndSaveStrategyStats(strategyId, manager)
  }

  async afterUpdate(event: UpdateEvent<OptionTrade>): Promise<void> {
    // Retrieve the account
    const { manager, entity } = event
    const { userId, strategyId } = await getParentStrategyAndUserId(
      entity.id as string,
      manager,
      'stock',
    )

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
    await recomputeAndSaveStrategyStats(strategyId, manager)
  }

  async beforeRemove(event: RemoveEvent<OptionTrade>): Promise<void> {
    // Retrieve the account
    const { manager, entity } = event
    const { userId, strategyId } = await getParentStrategyAndUserId(
      entity.id,
      manager,
      'stock',
    )

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
    await recomputeAndSaveStrategyStats(strategyId, manager)
  }

  async beforeSoftRemove(event: SoftRemoveEvent<OptionTrade>): Promise<void> {
    // Retrieve the account
    const { manager, entity } = event
    const { userId, strategyId } = await getParentStrategyAndUserId(
      entity.id,
      manager,
      'stock',
    )

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
    await recomputeAndSaveStrategyStats(strategyId, manager)
  }
}
