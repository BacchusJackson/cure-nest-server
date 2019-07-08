import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    
    @Get('/username/:username')
    getUserByUsernameRequest(@Param('username') username) {
        return this.usersService.findUser({username: username});
    }

    @Get('/id/:id')
    getUserByIDRequest(@Param('id') id) {
        return this.usersService.findUser({userID: id});
    }

    @Post()
    postUserRequest(@Body() newUser) {
        return this.usersService.addUser(newUser);
    }

    @Delete('/username/:username')
    deleteUserRequest(@Param('username') username) {
        return this.usersService.deleteUser(username);
    }

    @Put('/username/:username')
    putUserRequest(@Param('username') username, @Body() updateUser) {
        return this.usersService.updateUser(username, updateUser);
    }
}
