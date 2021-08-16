import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { Address } from './Address';
import { Occurrence } from './Occurrence';

import uuid from '../libs/uuid';
import { hash } from '../libs/bcrypt';

@Entity('users')
export class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column({ length: 11 })
  cpf: string;

  @Column()
  mainEmail: string;

  @Column({ nullable: true })
  secondEmail: string;

  @Column({ length: 11 })
  mainPhoneNumber: string;

  @Column({ nullable: true, length: 11 })
  secondPhoneNumber: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Occurrence, (occurrence) => occurrence.user)
  @JoinColumn()
  occurrences: Occurrence[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password);
  }

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
