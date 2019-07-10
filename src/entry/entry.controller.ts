import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { EntryService } from './entry.service';

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) { }

  @Post()
  newEntryRequest(@Body() newEntry) {
    return this.entryService.createEntry(newEntry);
  }

  @Get()
  getAllEntriesRequest() {
    return this.entryService.readAllEntries();
  }

  @Delete('/:id')
  deleteEntryRequest(@Param('id') id) {
    return this.entryService.deleteEntry(id);
  }

}
