import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';

@Module({
  imports: [],
  controllers: [ActivityController],
  providers: [ActivityService],

})
export class ActivityModule { }
