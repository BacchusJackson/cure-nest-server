import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService:AuthenticationService, private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'someSecretKey'
        })
    }

    validate(payload) {
        const user = this.userService.findUser({userID: payload.userID});
        if(!user) {
            throw new UnauthorizedException();
        } else {
            return user;
        }
    }
}