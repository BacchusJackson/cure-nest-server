import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { EntryModule } from './entry/entry.module';
import { ActivityModule } from './activity/activity.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [AuthenticationModule, TypeOrmModule.forRoot(), UsersModule, EntryModule, ActivityModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}