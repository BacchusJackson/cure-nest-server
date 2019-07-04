import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector:Reflector){}
  canActivate(context: ExecutionContext): boolean {

    // Get the roles from the decorator metadata
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // If the route has no role decorator
    if(!roles) return true;

    // Get the passed user from the request
    const request = context.switchToHttp().getRequest();
    const user = request.body.user;

    // Check for the neccesary role
    const hasRole = () => {
      user.roles.some((role) => {
        roles.includes(role)
      })
    }
    
    if(user && user.roles && hasRole) {
      return true
    } else {
      return false
    }
  }
}
