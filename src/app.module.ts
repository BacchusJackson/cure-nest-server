import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationService } from './authentication/authentication.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AuthenticationService],
})
export class AppModule {}
