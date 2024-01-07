import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from './user.entity'

@Entity()
export class Account {
  @PrimaryColumn({ type: 'uuid' })
  id: string

  @OneToOne(() => User)
  @JoinColumn({ name: 'id' })
  user: User

  @Column({ type: 'float', default: 0 })
  openOptionsProfit: number

  @Column({ type: 'float', default: 0 })
  realisedOptionsProfit: number

  @Column({ type: 'float', default: 0 })
  realisedStocksProfit: number

  @Column({ type: 'float', default: 0 })
  openStocksProfit: number

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

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz', select: false })
  deletedAt?: Date
}
