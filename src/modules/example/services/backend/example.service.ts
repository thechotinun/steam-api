import { Example } from '@entities/example.entity';
import { ExampleException } from '@exceptions/app/example.exception';
import { CreateExampleDto } from '@modules/example/dto/create-example.dto';
import { UpdateExampleDto } from '@modules/example/dto/update-example.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExampleRepository } from '@repositories/example.repository';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { UpdateResult } from 'typeorm';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(ExampleRepository)
    private readonly exampleRepository: ExampleRepository,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Example>> {
    const queryBuilder = this.exampleRepository
      .createQueryBuilder('example')
      .orderBy('example.createdDate', 'DESC');

    return paginate<Example>(queryBuilder, options);
  }

  async findOneById(id: number): Promise<Example> {
    return await this.exampleRepository
      .findOneOrFail({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw ExampleException.notFound();
      });
  }

  async create(payload: CreateExampleDto): Promise<Example> {
    try {
      const create = await this.exampleRepository.create(payload);

      return await this.exampleRepository.save(create);
    } catch (error) {
      throw ExampleException.createError(error.message);
    }
  }

  async update(id: number, payload: UpdateExampleDto): Promise<Example> {
    try {
      await this.findOneById(id);

      await this.exampleRepository.update(id, {
        ...payload,
      });

      return await this.findOneById(id);
    } catch (error) {
      throw ExampleException.updateError(error.message);
    }
  }

  async remove(id: number): Promise<UpdateResult> {
    try {
      await this.findOneById(id);

      return await this.exampleRepository.softDelete(id);
    } catch (error) {
      throw ExampleException.deleteError(error.message);
    }
  }
}
