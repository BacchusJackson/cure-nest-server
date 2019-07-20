import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const port = process.env.PORT || 3000;
  const appServer = await NestFactory.create(AppModule);
  await appServer.listen(port);

  Logger.log("Server Running on Port: " + port, "**Bootstrap");
}
bootstrap();