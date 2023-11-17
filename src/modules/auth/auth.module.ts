import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService as BackendAuthService } from './services/backend/auth.service';
import { AuthService as FrontendAuthService } from './services/frontend/auth.service';
import { AuthController as BackendAuthController } from './controllers/backend/auth.controller';
import { AuthController as FrontendAuthController } from './controllers/frontend/auth.controller';
import { OauthUserRepository } from '@repositories/o-auth.repository';
import { PassportModule } from '@nestjs/passport';
import { SteamStrategy } from '@common/steam/steam.strategy';
import { MyLogger } from '@common/logger/mylogger.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'steam' }),
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  providers: [
    BackendAuthService,
    FrontendAuthService,
    OauthUserRepository,
    SteamStrategy,
    MyLogger,
  ],
  controllers: [BackendAuthController, FrontendAuthController],
  exports: [BackendAuthService, FrontendAuthService],
})
export class AuthModule {}
