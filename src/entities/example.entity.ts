import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity('example')
export class Example extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;
}
