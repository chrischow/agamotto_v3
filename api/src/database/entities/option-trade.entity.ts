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

@Entity({ name: 'option_trades' })
export class OptionTrade {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 16 })
  ticker: string

  @Column({ type: 'varchar', length: 16 }) // Put or call
  instrument: string

  @Column({ type: 'int' })
  quantity: number

  @Column({ type: 'varchar', length: 16 }) // Long or short
  position: string

  @Column({ type: 'timestamptz' })
  expiry: Date

  @Column({ type: 'float' })
  strike: number

  @Column({ type: 'timestamptz' })
  openDate: Date

  @Column({ type: 'float' })
  openPrice: number

  @Column({ type: 'float' })
  openDelta: number

  @Column({ type: 'timestamptz', nullable: true })
  closeDate?: Date

  @Column({ type: 'float', nullable: true })
  closePrice?: number

  @Column({ type: 'float', nullable: true })
  closeDelta?: number

  @Column({ type: 'varchar', nullable: true })
  remarks?: string

  @ManyToOne(() => Strategy, (strategy) => strategy.optionTrades)
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
