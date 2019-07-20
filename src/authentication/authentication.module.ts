import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UsersService } from "../users/users.service";
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(
      {
        secret: 'someSecretKey',
        signOptions: { expiresIn: 3600 }
      }
    )
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UsersService, JwtStrategy]
})
export class AuthenticationModule { }
