import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  cryptocurrensy_name: string;

  @Column({ type: 'varchar', length: 20 })
  cryptocurrensy_symbol: string;

  @Column({ type: 'numeric', precision: 22, scale: 15, nullable: true })
  coinMarketCap: number;

  @Column({ type: 'numeric', precision: 22, scale: 15, nullable: true })
  coinBase: number;

  @Column({ type: 'numeric', precision: 22, scale: 15, nullable: true })
  coinStats: number;

  @Column({ type: 'numeric', precision: 22, scale: 15, nullable: true })
  kucoin: number;

  @Column({ type: 'numeric', precision: 22, scale: 15, nullable: true })
  coinPaprika: number;

  @Column({ type: 'numeric', precision: 22, scale: 15, nullable: true })
  price_average: number;

  @Column({
    type: 'timestamp',
  })
  date: string;
}
