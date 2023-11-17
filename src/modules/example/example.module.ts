import { Module } from '@nestjs/common';
import { ExampleService as BackendExampleService } from './services/backend/example.service';
import { ExampleRepository } from '@repositories/example.repository';
import { ExampleController as BackendExampleController } from './controllers/backend/example.controller';
import { ExampleController as FrontendExampleController } from './controllers/frontend/example.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { MyLogger } from '@common/logger/mylogger.service';

@Module({
  imports: [AuthModule],
  controllers: [BackendExampleController, FrontendExampleController],
  providers: [BackendExampleService, ExampleRepository, MyLogger],
})
export class ExampleModule {}
