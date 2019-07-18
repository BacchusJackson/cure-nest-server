import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { NewActivity } from './activityCollection.interface';
import { identifier } from '@babel/types';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) { }

  @Post()
  newActivityRequest(@Body() newActivity: NewActivity) {
    return this.activityService.createActivity(newActivity);
  }

  @Get()
  getAllActivitiesRequest() {
    return this.activityService.readAllActivities();
  }

  @Put('/:id')
  modifyActivityRequest(@Param('id') id, @Body() updatedActivity: NewActivity) {
    return this.activityService.updateActivity(id, updatedActivity)
  }

  @Delete('/:id')
  deleteActivityRequest(@Param('id') id) {
    return this.activityService.deleteActivity(id);
  }
}