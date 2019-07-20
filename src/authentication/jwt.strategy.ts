import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'someSecretKey'
        })
    }ß

    validate(payload) {
        const user = this.userService.readUserByID(payload.userID);
        if(!user) {
            throw new UnauthorizedException();
        } else {
            return user;
        }
    }
}