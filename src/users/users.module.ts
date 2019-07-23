import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserEntity } from './user.entity';
import { ClinicEntity } from '../clinic/clinic.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, ClinicEntity])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})

export class UsersModule {}