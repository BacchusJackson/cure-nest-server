import { Controller, Post, Body, Get, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityDTO } from "./activity.dto";
import { AuthGuard } from '../common/auth.guard';
import { Roles } from "../decorators/roles.decorator";

@Controller()
@UseGuards(AuthGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) { }

  // USER ROUTES
  @Get('activity')
  @Roles('user')
  getAllActivitiesRequest() {
    return this.activityService.readAllActivities();
  }

  // ADMIN ROUTES
  @Post('activity')
  @Roles('admin')
  newActivityRequest(@Body() newActivity: ActivityDTO) {
    return this.activityService.createActivity(newActivity);
  }


  @Put('activity/id=:id')
  @Roles('admin')
  modifyActivityRequest(@Param('id') id, @Body() updatedActivity: ActivityDTO) {
    return this.activityService.updateActivity(id, updatedActivity)
  }

  @Delete('activity/id=:id')
  @Roles('admin')
  deleteActivityRequest(@Param('id') id) {
    return this.activityService.deleteActivity(id);
  }

  // DEVELOPER ROUTES
  @Get('dev/activity/')
  @Roles('developer')
  getAllActivitiesWithDeletedRequest() {
    return this.activityService.readAllActivitiesWithDeleted();
  }

  @Put('dev/activity/id=:id')
  @Roles('developer')
  restoreDeletedRequest(@Param('id') id) {
    return this.activityService.restoreActivity(id);
  }

}