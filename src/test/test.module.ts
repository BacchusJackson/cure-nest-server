import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TestEntity } from "./test.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity]), UsersModule],
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {}
