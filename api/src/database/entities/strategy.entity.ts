import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { OptionTrade } from './option-trade.entity'
import { StockTrade } from './stock-trade.entity'

@Entity()
export class Strategy {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar' })
  description?: string

  @OneToMany(() => OptionTrade, (optionTrade) => optionTrade.strategy)
  optionTrades: OptionTrade[]

  @OneToMany(() => StockTrade, (stockTrade) => stockTrade.strategy)
  stockTrades: StockTrade[]

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date
}
