import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [AuthenticationModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
