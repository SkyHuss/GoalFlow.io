import { CanActivate, ExecutionContext } from '@nestjs/common';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from 'src/lib/auth';
import { Request } from 'express';

export class HasUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest<Request>();

    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (session && session.user) {
      return true;
    }

    return false;
  }
}
