import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register(
            {
            secret: 'someSecretKey',
            signOptions: {expiresIn: 3600} 
            }
    )
],
    providers: [AuthenticationService, JwtStrategy],
    controllers: [AuthenticationController]
})
export class AuthenticationModule {}
