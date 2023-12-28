import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Strategy } from './strategy.entity'

@Entity({ name: 'stock_trades' })
export class StockTrade {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 16 })
  ticker: string

  @Column({ type: 'int' })
  quantity: number

  @Column({ type: 'varchar', length: 16 }) // Long or short
  position: string

  @Column({ type: 'float' })
  openPrice: number

  @Column({ type: 'float' })
  closePrice: number

  @Column({ type: 'varchar' })
  remarks?: string

  @ManyToOne(() => Strategy, (strategy) => strategy.stockTrades)
  @JoinColumn({ name: 'strategyId' })
  strategy: Strategy

  @Column({ type: 'uuid' })
  strategyId: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date
}
