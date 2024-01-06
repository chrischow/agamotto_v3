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

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date
}
