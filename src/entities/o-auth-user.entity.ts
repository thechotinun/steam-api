import { v4 as uuidv4 } from 'uuid';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('oAuthUser')
export class OauthUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userId', type: 'int' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: number;

  @Column({ type: 'uuid' })
  accessToken: string;

  @Column({ type: 'uuid' })
  refreshToken: string;

  @BeforeInsert()
  insertCreated() {
    this.refreshToken = uuidv4();
    this.accessToken = uuidv4();
  }
}
