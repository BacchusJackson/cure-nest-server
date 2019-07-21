import { Controller, Get, Param, Post, Body, Delete, Put, Logger, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../common/auth.guard';

@Controller('')
export class UsersController {
  private logger = new Logger('**UsersController');
  constructor(private readonly usersService: UsersService) { }

  @Post('logOn')
  postLogOnRequest(@Body() credentials) {
    this.logger.log('Log On Attempt @' + credentials.username, '**UsersService');

    return this.usersService.logOn(credentials);

  }

  @Post('users')
  @UseGuards(AuthGuard)
  postUserRequest(@Body() newUser) {
    this.logger.log('New User Request, Username: ' + newUser.username);
    return this.usersService.createUser(newUser);
  }

  @Get('users')
  @UseGuards(AuthGuard)
  getAllUsersRequest() {
    return this.usersService.readAllUsers();
  }

  @Get('users/username/:username')
  @UseGuards(AuthGuard)
  getUserByUsernameRequest(@Param('username') username) {
    return this.usersService.readUserByUsername(username);
  }

  @Get('users/id/:id')
  @UseGuards(AuthGuard)
  getUserByIDRequest(@Param('id') id) {
    return this.usersService.readUserByID(id);
  }

  @Put('users/id/:id')
  @UseGuards(AuthGuard)
  putUserRequest(@Param('id') id, @Body() updateUser) {
    return this.usersService.updateUser(id, updateUser);
  }

  @Delete('users/id/:id')
  @UseGuards(AuthGuard)
  deleteUserRequest(@Param('id') id) {
    this.logger.log('Delete User Request, id:' + id)
    return this.usersService.deleteUser(id);
  }
}
