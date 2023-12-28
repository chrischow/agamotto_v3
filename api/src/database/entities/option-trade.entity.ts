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
import { User } from './user.entity'

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

  @Column({ type: 'float' })
  openPrice: number

  @Column({ type: 'float' })
  closePrice: number

  @Column({ type: 'varchar' })
  remarks?: string

  @ManyToOne(() => User, (user) => user.optionTrades)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column({ type: 'uuid' })
  userId: string

  @ManyToOne(() => Strategy, (strategy) => strategy.optionTrades)
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
