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
import { StockTrade } from '../entities/stock-trade.entity'
import { getUserId, recomputeAndSaveAccountStats } from './utils'

@EventSubscriber()
export class StockTradeSubscriber
  implements EntitySubscriberInterface<StockTrade>
{
  listenTo() {
    return StockTrade
  }

  async afterInsert(event: InsertEvent<StockTrade>): Promise<void> {
    /**
     * Incrementally update account
     */
    const { manager, entity } = event
    const accountRepo = manager.getRepository(Account)

    // Retrieve the account
    const userId = await getUserId(entity.id, manager, 'stock')
    const account = await accountRepo.findOne({
      where: { id: userId },
    })

    // Data to update
    const positionMultiplier = entity.position === 'LONG' ? 1 : -1

    // Logging of a completed option trade
    if (entity.closePrice != null) {
      await accountRepo.update(
        { id: userId },
        {
          openStocksProfit:
            account.openStocksProfit +
            entity.openPrice * entity.quantity * positionMultiplier,
          realisedStocksProfit:
            account.realisedOptionsProfit +
            (entity.closePrice - entity.openPrice) *
              entity.quantity *
              positionMultiplier,
          numberOfOpenStockTrades: account.numberOfOpenStockTrades - 1,
          numberOfClosedStockTrades: account.numberOfClosedStockTrades + 1,
        },
      )
    } else {
      // Logging of an open option trade
      await accountRepo.update(
        { id: userId },
        {
          openStocksProfit:
            account.openOptionsProfit -
            entity.openPrice * entity.quantity * positionMultiplier,
          numberOfOpenStockTrades: account.numberOfOpenStockTrades + 1,
        },
      )
    }
  }

  async afterUpdate(event: UpdateEvent<OptionTrade>): Promise<void> {
    // Retrieve the account
    const { manager, entity } = event
    const userId = await getUserId(entity.id as string, manager, 'stock')

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
  }

  async afterRemove(event: RemoveEvent<OptionTrade>): Promise<void> {
    // Retrieve the account
    const { manager, entity } = event
    const userId = await getUserId(entity.id, manager, 'stock')

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
  }

  async afterSoftRemove(event: SoftRemoveEvent<OptionTrade>): Promise<void> {
    // Retrieve the account
    const { manager, entity } = event
    const userId = await getUserId(entity.id, manager, 'stock')

    // Re-compute stats and save
    await recomputeAndSaveAccountStats(userId, manager)
  }
}
