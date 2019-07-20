import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { EntryModule } from './entry/entry.module';
import { ActivityModule } from './activity/activity.module';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, EntryModule, ActivityModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}