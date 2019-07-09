import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { EntryService } from './entry.service';

@Controller('entry')
export class EntryController {
    constructor(private readonly entryService: EntryService) {}

    @Post()
    postNewEntryRequest(@Body() newEntry) {
        return this.entryService.addEntry(newEntry);
    }

    @Get()
    getAllEntriesRequest() {
        return this.entryService.getAllEntries();
    }

    @Delete('/:id')
    deleteEntryRequest(@Param('id') id) {
        return this.entryService.deleteEntry(id);
    }

}
