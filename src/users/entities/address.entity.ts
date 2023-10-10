import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.addressList)
  user_id: User;
}
