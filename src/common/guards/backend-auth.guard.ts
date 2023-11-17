import { AuthService } from '@modules/auth/services/backend/auth.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { get } from 'lodash';

@Injectable()
export class BackendAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      const auth = await this.authService.validateToken(token);

      if (
        auth &&
        (!requiredRoles || requiredRoles.includes(get(auth, 'user.role')))
      ) {
        return true;
      }
    }

    return false;
  }
}
