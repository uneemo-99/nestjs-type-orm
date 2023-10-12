import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detail: string;

  @Column()
  province: string;

  @Column()
  zip_code: number;

  @ManyToOne(() => User, (user) => user.address)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
