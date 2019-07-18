import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';

@Module({
    imports: [],
    controllers: [EntryController],
    providers: [EntryService]
})

export class EntryModule {}
