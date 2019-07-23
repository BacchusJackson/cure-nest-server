import { Controller, Get, UseGuards, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { AuthGuard } from '../common/auth.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller()
@UseGuards(AuthGuard)
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) { }

  // USER ROUTES
  @Get('clinic')
  @Roles('user')
  getClinicsRequest() {

    return this.clinicService.readAllClinics();
  }

  // ADMIN ROUTES
  @Post('clinic')
  @Roles('admin')
  postClinicRequest(@Body() data) {
    
    return this.clinicService.createClinic(data);
  }

  @Put('clinic/id=:id')
  @Roles('admin')
  updateClinicRequest(@Param('id') id, @Body() data) {

    return this.clinicService.updateClinic(id, data);
  }

  @Delete('clinic/id=:id')
  @Roles('admin')
  deleteClinicRequest(@Param('id') id) {

    return this.clinicService.deleteClinic(id);
  }

  // DEVELOPER ROUTES
  @Get('dev/clinic')
  @Roles('developer')
  getClinicsWithDeletedRequest() {

    return this.clinicService.readAllClinicsWithDeleted();
  }

  @Put('dev/clinic/id=:id')
  @Roles('developer')
  restoreClinicRequest(@Param('id') id) {

    return this.clinicService.restoreClinic(id);
  }
}
