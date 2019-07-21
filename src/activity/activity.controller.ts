import { Controller, Post, Body, Get, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityDTO } from "./activity.dto";
import { AuthGuard } from '../common/auth.guard';

@Controller('activity')
@UseGuards(AuthGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) { }

  @Post()
  newActivityRequest(@Body() newActivity: ActivityDTO) {
    return this.activityService.createActivity(newActivity);
  }

  @Get()
  getAllActivitiesRequest() {
    return this.activityService.readAllActivities();
  }

  @Put('/:id')
  modifyActivityRequest(@Param('id') id, @Body() updatedActivity: ActivityDTO) {
    return this.activityService.updateActivity(id, updatedActivity)
  }

  @Delete('/:id')
  deleteActivityRequest(@Param('id') id) {
    return this.activityService.deleteActivity(id);
  }
}