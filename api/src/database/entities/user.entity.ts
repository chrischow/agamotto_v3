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

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255 })
  password: string

  @OneToMany(() => OptionTrade, (optionTrade) => optionTrade.user)
  optionTrades: OptionTrade[]

  @OneToMany(() => StockTrade, (stockTrade) => stockTrade.user)
  stockTrades: StockTrade[]

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date
}
