import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles defined → allow access
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user) return false;

    // Handle string role
    if (typeof user.role === 'string') {
      return requiredRoles.includes(user.role);
    }

    // Handle array of roles
    if (Array.isArray(user.roles)) {
      return requiredRoles.some((role) => user.roles.includes(role));
    }

    return false; // default deny
  }
}
