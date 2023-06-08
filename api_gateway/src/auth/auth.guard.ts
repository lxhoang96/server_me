
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGatewayService } from './auth.service';
import { firstValueFrom, map } from 'rxjs';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthGatewayService,
    private reflector: Reflector) { 
    }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const sessionValue = request.headers.session;

    if (!sessionValue) {
      throw new UnauthorizedException();
    }

    try {
      this.authService.validateUser(sessionValue).pipe(map(session => {
        if (session.isExpired) {
          throw new UnauthorizedException();
        }
      }))
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

}