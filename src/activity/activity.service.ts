import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ActivityDTO } from './activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityEntity } from './activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityService {

  constructor(
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>
  ) { }

  async createActivity(newActivity: ActivityDTO) {
    const activity = await this.activityRepository.create(newActivity);
    await this.activityRepository.save(activity);

    return activity.toResponseObject();
  }

  async readAllActivities() {
    const activities = await this.activityRepository.find({ where: { active: true } });

    return activities.map(activity => activity.toResponseObject());
  }

  async updateActivity(activityID: string, updatedActivity: Partial<ActivityDTO>) {
    let activity = await this.activityRepository.findOne({ where: { id: activityID } });

    if (!activity) {
      throw new HttpException('Activity Not Found', HttpStatus.NOT_FOUND);
    }

    await this.activityRepository.update({ id: activityID }, updatedActivity);

    activity = await this.activityRepository.findOne({ where: { id: activityID } });

    return activity.toResponseObject();

  }

  async deleteActivity(activityID: string) {
    let activity = await this.activityRepository.findOne({ where: { id: activityID } });

    if (!activity) {
      throw new HttpException('Activity Not Found', HttpStatus.NOT_FOUND);
    }

    await this.activityRepository.update({ id: activityID }, { active: false });

    return { success: true }
  }
}