import { AuthService } from '@modules/auth/services/frontend/auth.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class FrontendAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      const user = await this.authService.validateToken(token);

      if (user) {
        return true;
      }
    }

    return false;
  }
}
