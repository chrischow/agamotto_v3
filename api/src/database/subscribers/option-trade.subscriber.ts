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
    /**
     * Incrementally update account
     */
    const { manager, entity } = event
    const accountRepo = manager.getRepository(Account)

    // Retrieve the account
    const userId = await getUserId(entity.id, manager, 'option')
    const account = await accountRepo.findOne({
      where: { id: userId },
    })

    // Data to update
    const positionMultiplier = entity.position === 'LONG' ? 1 : -1
    const openTradesColumn =
      entity.instrument === 'PUT'
        ? 'numberOfOpenPutTrades'
        : 'numberOfOpenCallTrades'
    const closedTradesColumn =
      entity.instrument === 'PUT'
        ? 'numberOfClosedPutTrades'
        : 'numberOfClosedCallTrades'

    // Logging of a completed option trade
    if (entity.closePrice !== undefined && entity.closePrice !== null) {
      await accountRepo.update(
        { id: userId },
        {
          openOptionsProfit:
            account.openOptionsProfit +
            entity.openPrice * entity.quantity * 100 * positionMultiplier,
          realisedOptionsProfit:
            account.realisedOptionsProfit +
            (entity.closePrice - entity.openPrice) *
              entity.quantity *
              100 *
              positionMultiplier,
          [openTradesColumn]: account[openTradesColumn] - 1,
          [closedTradesColumn]: account[closedTradesColumn] + 1,
        },
      )
    } else {
      // Logging of an open option trade
      await accountRepo.update(
        { id: userId },
        {
          openOptionsProfit:
            account.openOptionsProfit -
            entity.openPrice * entity.quantity * 100 * positionMultiplier,
          [openTradesColumn]: account[openTradesColumn] + 1,
        },
      )
    }
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
