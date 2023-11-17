import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../services/frontend/auth.service';
import { LoginDto } from '@modules/auth/dto/backend/login.dto';

@Controller('api/v1/frontend/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() credential: LoginDto) {
    return this.authService.signIn(credential);
  }
}
