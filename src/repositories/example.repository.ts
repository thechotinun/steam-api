import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Example } from '@entities/example.entity';

@Injectable()
export class ExampleRepository extends BaseRepository<Example> {
  constructor(private dataSource: DataSource) {
    super(Example, dataSource.createEntityManager());
  }
}
