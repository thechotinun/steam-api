import { BaseResourceDto } from '@common/resources/base.resource';
import { ResourceWithPaginateDto } from '@common/resources/paginate.resource';
import { Expose, Type } from 'class-transformer';

export class ExampleDto extends BaseResourceDto {
  @Expose()
  name: string;
}

export class ExampleResourceDto extends ResourceWithPaginateDto {
  @Expose()
  @Type(() => ExampleDto)
  data: ExampleDto;
}
