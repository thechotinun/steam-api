import { Module } from '@nestjs/common';
import { UserService as BackendUserService } from './services/backend/user.service';
import { UserRepository } from '@repositories/user.repository';

@Module({
  providers: [BackendUserService, UserRepository],
  exports: [BackendUserService],
})
export class UserModule {}
