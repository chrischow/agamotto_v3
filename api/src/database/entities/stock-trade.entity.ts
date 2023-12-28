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

  @Column({ type: 'float', nullable: true })
  closePrice?: number

  @Column({ type: 'varchar', nullable: true })
  remarks?: string

  @ManyToOne(() => Strategy, (strategy) => strategy.stockTrades)
  @JoinColumn({ name: 'strategyId' })
  strategy: Strategy

  @Column({ type: 'uuid' })
  strategyId: string

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz', select: false })
  deletedAt?: Date
}
