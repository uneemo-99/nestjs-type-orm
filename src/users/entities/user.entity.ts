import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  f_name: string;

  @Column()
  l_name: string;

  @Column()
  email: string;

  @Column()
  tel_number: string;

  @OneToMany(() => Address, (address) => address.user_id, { cascade: true })
  addressList: Address[];
}
