import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Post('/signIn')
    postSignIn(@Body() credentials) {
        return this.authService.postAuthenticate(credentials);
    }

    @Get('data')
    @UseGuards(AuthGuard())
    getPrivateData() {
        return 'You got it'
    }
}
