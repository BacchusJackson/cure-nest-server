import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/data')
  @Roles('user')
  @UseGuards(RolesGuard)
  getData(): string {
    return 'Heres the data'
  }

  @Get('/adminData')
  @Roles('admin')
  @UseGuards(RolesGuard)
  getAdminData(): string {
    return 'Heres some Admin data!'
  }

}
