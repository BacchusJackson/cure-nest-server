import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { getRepository } from "typeorm";
import * as jwt from 'jsonwebtoken';
import { UserEntity } from '../users/user.entity';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get('roles', context.getHandler());

    if (request) {
      if (!request.headers.authorization) {
        return false;
      }
      request.user = await this.validateToken(request.headers.authorization);

      const validRole = await this.validateUserRole(request.user, roles);

      if (!validRole) {
        throw new HttpException('Invalid Permissions', HttpStatus.UNAUTHORIZED)
      }

      return true;
    }
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];

    try {
      const decoded: any = await jwt.verify(token, process.env.SECRET);
      return decoded;
    } catch (err) {
      const message = 'Token error -> ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }

  async validateUserRole(userToken: decodedTokenUser, roles: string[]): Promise<boolean> {

    // If there is no Role decorator on the route
    if (!roles) return true;

    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { id: userToken.id, active: true } });

    if (!user) return false;

    const userRolesArray = user.roles.split(', ');

    if (userRolesArray.length < 1) {
      Logger.error('Roles parsing error', 'From Auth Guard', '**AuthGuard');
      return false;
    }

    const userHasRole = roles.some((itemInRolesDecorator) => {
      return userRolesArray.includes(itemInRolesDecorator);
    });

    if (userHasRole) return true;

    return false;
  }
}

interface decodedTokenUser {
  id: string;
  username: string;
  roles: string;
}