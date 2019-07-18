import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = 3000;
  const appServer = await NestFactory.create(AppModule);  
  await appServer.listen(port);

  Logger.log("Server Running on Port: " + port, "DEV INFO");
}
bootstrap();
