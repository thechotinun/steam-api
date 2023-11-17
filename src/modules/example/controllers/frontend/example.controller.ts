import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiResource } from '@common/reponses/api-resource';
import { FrontendAuthGuard } from '@common/guards/frontend-auth.guard';

@UseGuards(FrontendAuthGuard)
@Controller('api/v1/frontend/examples')
export class ExampleController {
  @Get()
  async get(): Promise<ApiResource> {
    try {
      const reponse = {
        data: 'test',
      };

      return ApiResource.successResponse(reponse);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
