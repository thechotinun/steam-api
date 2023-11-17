import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import { OauthUser } from './o-auth-user.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  salt: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  role: string;

  @OneToMany(() => OauthUser, (oAuth) => oAuth.user)
  oAuth: OauthUser[];
}
