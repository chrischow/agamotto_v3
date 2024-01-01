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
  numberOfOpenPutTrades: number

  @Column({ type: 'int', default: 0 })
  numberOfClosedPutTrades: number

  @Column({ type: 'int', default: 0 })
  numberOfOpenCallTrades: number

  @Column({ type: 'int', default: 0 })
  numberOfClosedCallTrades: number

  @Column({ type: 'int', default: 0 })
  numberOfOpenStockTrades: number

  @Column({ type: 'int', default: 0 })
  numberOfClosedStockTrades: number

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz', select: false })
  deletedAt?: Date
}
