import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "../users/users.controller";
import { UsersService } from "../users/users.service";
import { UsersEntity } from './users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    controllers: [UsersController],
    providers: [UsersService]
})

export class UsersModule {}
