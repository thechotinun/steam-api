import { Body, Controller, Req, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../../services/backend/auth.service';
import { LoginDto } from '@modules/auth/dto/backend/login.dto';
import { UseResources } from 'interceptors/use-resources.interceptor';
import { AuthResourceDto } from '@modules/auth/resources/backend/auth.resource';
import { ApiResource } from '@common/reponses/api-resource';
import { AuthGuard } from '@nestjs/passport';
import { MyLogger } from '@common/logger/mylogger.service';

@Controller('api/v1/backend/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly myLogger: MyLogger,
  ) {}

  @Post('login')
  @UseResources(AuthResourceDto)
  async signIn(@Body() credential: LoginDto): Promise<ApiResource> {
    try {
      const reponse = await this.authService.signIn(credential);

      return ApiResource.successResponse(reponse);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Get('steam')
  @UseGuards(AuthGuard('steam'))
  async steamLogin() {
    // Initiates the Steam OAuth 2.0 login process
  }

  @Get('steam/callback')
  @UseGuards(AuthGuard('steam'))
  async steamLoginCallback(@Req() req): Promise<ApiResource> {
    // Handles the Steam OAuth 2.0 callback
    try {
      this.myLogger.debug(`This Logging is debug`);
      return ApiResource.successResponse(req.user);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
