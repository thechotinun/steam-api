import { Module } from '@nestjs/common';
import configuration from '@config/configuration';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { EventEmitterModule } from '@nestjs/event-emitter';
import TypeOrmConfigService from '@config/typeorm/default';
import { ExceptionFilter } from '@exceptions/exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from '@common/logger/mylogger.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ExampleModule } from '@modules/example/example.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    }),
    MulterModule.register({
      dest: './files',
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    ExampleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule {}
