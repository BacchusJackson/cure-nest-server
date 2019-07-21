import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryDTO } from "./entry.dto";

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) { }

  @Post()
  newEntryRequest(@Body() data: EntryDTO) {
    const testUserID: string = "DF564C97-0BAB-E911-822D-029B298EC4B4";
    return this.entryService.createEntry(testUserID, data);
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
