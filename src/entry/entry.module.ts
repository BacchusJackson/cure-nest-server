import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryEntity } from './entry.entity';
import { UserEntity } from '../users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EntryEntity, UserEntity ])],
    controllers: [EntryController],
    providers: [EntryService]
})

export class EntryModule {}
