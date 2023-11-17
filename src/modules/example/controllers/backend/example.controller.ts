import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginateQuery } from '@common/dto/paginate.query';
import { ExampleService } from '@modules/example/services/backend/example.service';
import { ApiResource } from '@common/reponses/api-resource';
import { UseResources } from 'interceptors/use-resources.interceptor';
import { ExampleResourceDto } from '@modules/example/resources/example.resource';
import { CreateExampleDto } from '@modules/example/dto/create-example.dto';
import { UpdateExampleDto } from '@modules/example/dto/update-example.dto';
import { MyLogger } from '@common/logger/mylogger.service';

@Controller(`api/v1/backend/examples`)
export class ExampleController {
  constructor(
    private readonly exampleService: ExampleService,
    private readonly myLogger: MyLogger,
  ) {}

  @Get()
  @UseResources(ExampleResourceDto)
  async paginate(
    @Query() { page, limit }: PaginateQuery,
  ): Promise<ApiResource> {
    try {
      const reponse = await this.exampleService.paginate({
        page,
        limit,
      });
      this.myLogger.debug(`This Logging is debug`);
      return ApiResource.successResponse(reponse);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<ApiResource> {
    try {
      const response = await this.exampleService.findOneById(id);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Post()
  async create(@Body() payload: CreateExampleDto): Promise<ApiResource> {
    try {
      const response = await this.exampleService.create(payload);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateExampleDto,
  ): Promise<ApiResource> {
    try {
      const response = await this.exampleService.update(id, payload);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ApiResource> {
    try {
      const response = await this.exampleService.remove(id);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
