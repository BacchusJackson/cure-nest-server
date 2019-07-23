import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EntryModule } from './entry/entry.module';
import { ActivityModule } from './activity/activity.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClinicModule } from './clinic/clinic.module';


@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, ActivityModule, EntryModule, ClinicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}