import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { OptionTrade } from './option-trade.entity'
import { StockTrade } from './stock-trade.entity'
import { User } from './user.entity'

@Entity()
export class Strategy {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', nullable: true })
  description?: string

  @OneToMany(() => OptionTrade, (optionTrade) => optionTrade.strategy, {
    cascade: true,
  })
  optionTrades: OptionTrade[]

  @OneToMany(() => StockTrade, (stockTrade) => stockTrade.strategy, {
    cascade: true,
  })
  stockTrades: StockTrade[]

  @ManyToOne(() => User, (user) => user.strategies)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column({ type: 'uuid' })
  userId: string

  @Column({ type: 'float', default: 0 })
  openOptionsProfit: number

  @Column({ type: 'float', default: 0 })
  realisedOptionsProfit: number

  @Column({ type: 'float', default: 0 })
  openStocksProfit: number

  @Column({ type: 'float', default: 0 })
  realisedStocksProfit: number

  @Column({ type: 'int', default: 0 })
  numOpenPuts: number

  @Column({ type: 'int', default: 0 })
  numClosedPuts: number

  @Column({ type: 'int', default: 0 })
  numOpenCalls: number

  @Column({ type: 'int', default: 0 })
  numClosedCalls: number

  @Column({ type: 'int', default: 0 })
  numOpenStockTrades: number

  @Column({ type: 'int', default: 0 })
  numClosedStockTrades: number

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date
}
