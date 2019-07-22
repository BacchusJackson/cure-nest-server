import { Controller, Get, Param, Post, Body, Delete, Put, Logger, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../common/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { identifier } from '@babel/types';

@Controller('')
export class UsersController {
  private logger = new Logger('**UsersController');
  constructor(private readonly usersService: UsersService) { }

  // OPEN ACCESS ROUTES
  @Post('logOn')
  postLogOnRequest(@Body() credentials) {
    this.logger.log('Log On Attempt @' + credentials.username, '**UsersService');

    return this.usersService.logOn(credentials);

  }

  // USER ROUTES
  @Get(':username/profile')
  @UseGuards(AuthGuard)
  @Roles('user')
  getUserProfileRequest(@Param('username') username, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.usersService.readUserByUsername(username, token);
  }

  @Put(':username/profile')
  @UseGuards(AuthGuard)
  @Roles('user')
  updateUserProfileRequest(@Param('username') username, @Body() data, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];

    return this.usersService.updateMyProfile(username, data, token)
  }

  // ADMIN ROUTES
  @Post('admin/users')
  @UseGuards(AuthGuard)
  @Roles('admin')
  postUserRequest(@Body() newUser) {
    this.logger.log('New User Request, @' + newUser.username);
    return this.usersService.createUser(newUser);
  }


  @Get('admin/users')
  @UseGuards(AuthGuard)
  @Roles('admin')
  getAllUsersRequest() {
    return this.usersService.readAllUsers();
  }

  @Get('admin/username=:username')
  @UseGuards(AuthGuard)
  @Roles('admin')
  getUserByUsernameRequest(@Param('username') username) {
    return this.usersService.readUserByUsername(username);
  }

  @Get('admin/id=:id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  getUserByIDRequest(@Param('id') id) {
    return this.usersService.readUserByID(id);
  }

  @Put('admin/id=:id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  putUserRequest(@Param('id') id, @Body() updateUser) {
    return this.usersService.updateUser(id, updateUser);
  }

  @Post('admin/roles/id=:id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  postRolesRequest(@Param('id') id, @Body() data) {
    return this.usersService.modifyRoles(id, data);
  }

  @Delete('admin/id=:id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  deleteUserRequest(@Param('id') id) {
    this.logger.log('Delete User Request, id:' + id)
    return this.usersService.deleteUser(id);
  }

  // DEVELOPER ROUTES
  @Get('dev/test')
  @UseGuards(AuthGuard)
  @Roles('developer')
  getTestRequest() {

    return 'Test Response Positive!'
  }

  // MASTER ROUTES
  @Get('master/test')
  @UseGuards(AuthGuard)
  @Roles('master')
  getMasterTestRequest() {

    return 'Master Test Response Positive!'
  }
}
