import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { EntryController } from './entry/entry.controller';
import { EntryService } from './entry/entry.service';

@Module({
  imports: [AuthenticationModule],
  controllers: [AppController, UsersController, EntryController],
  providers: [AppService, UsersService, EntryService],
})
export class AppModule {}
