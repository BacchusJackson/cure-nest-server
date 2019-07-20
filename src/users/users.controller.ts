import { Controller, Get, Param, Post, Body, Delete, Put, Logger } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private logger = new Logger('**UsersController');
  constructor(private readonly usersService: UsersService) { }

  @Post()
  postUserRequest(@Body() newUser) {
    this.logger.log('New User Request, Username: ' + newUser.username);
    return this.usersService.createUser(newUser);
  }

  @Get()
  getAllUsersRequest() {
    return this.usersService.readAllUsers();
  }

  @Get('/username/:username')
  getUserByUsernameRequest(@Param('username') username) {
    return this.usersService.readUserByUsername(username);
  }

  @Get('/id/:id')
  getUserByIDRequest(@Param('id') id) {
    return this.usersService.readUserByID(id);
  }

  @Put('/id/:id')
  putUserRequest(@Param('id') id, @Body() updateUser) {
    return this.usersService.updateUser(id, updateUser);
  }

  @Delete('/id/:id')
  deleteUserRequest(@Param('id') id) {
    this.logger.log('Delete User Request, id:' + id)
    return this.usersService.deleteUser(id);
  }
}
