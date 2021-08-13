import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from './User';

import uuid from '../libs/uuid';

@Entity('occurrence')
export class Occurrence {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  hairColor: string;

  @Column()
  skinColor: string;

  @Column()
  eyeColor: string;

  @Column()
  sex: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  otherDetails: string;

  @ManyToOne(() => User, (user) => user.occurrences)
  user: User;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
