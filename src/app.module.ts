import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { EntryController } from './entry/entry.controller';
import { EntryService } from './entry/entry.service';
import { ActivityService } from './activity/activity.service';
import { ActivityController } from './activity/activity.controller';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [AuthenticationModule, TypeOrmModule.forRoot()],
  controllers: [AppController, UsersController, EntryController, ActivityController],
  providers: [AppService, UsersService, EntryService, ActivityService],
})
export class AppModule {}