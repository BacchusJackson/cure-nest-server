import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationService } from './authentication.service';

@Module({
    imports: [
        JwtModule.register(
            {
            secret: 'someSecretKey',
            signOptions: {expiresIn: 3600} 
            }
    )
],
    providers: [AuthenticationService]
})
export class AuthenticationModule {}
