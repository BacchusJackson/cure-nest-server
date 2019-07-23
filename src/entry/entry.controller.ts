import { Controller, Post, Body, Get, Delete, Put, Param, UseGuards, Request } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryDTO } from "./entry.dto";
import { AuthGuard } from "../common/auth.guard";
import { Roles } from '../decorators/roles.decorator';

@Controller()
@UseGuards(AuthGuard)
export class EntryController {
  constructor(private readonly entryService: EntryService) { }

  // USER ROUTES
  @Post('entry')
  @UseGuards(AuthGuard)
  @Roles('user')
  newEntryRequest(@Body() data: EntryDTO, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.entryService.createEntry(token, data);
  }

  @Get('entry')
  getAllEntriesRequest() {
    return this.entryService.readAllEntries();
  }

  @Delete('entry/id=:id')
  @UseGuards(AuthGuard)
  @Roles('user')
  deleteEntryRequest(@Param('id') id, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];

    return this.entryService.deleteEntry(id, token);
  }

  // ADMIN ROUTES
  @Get('admin/entry/id=:id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  getEntryRequest(@Param('id') id) {
    return this.entryService.readEntry(id);
  }

  @Delete('admin/entry/id=:id')
  @Roles('admin')
  adminDeleteEntryRequest(@Param('id') id) {
    return this.entryService.adminDeleteEntry(id);
  }
  // DEV ROUTES
  @Get('dev/entry')
  @UseGuards(AuthGuard)
  @Roles('developer')
  getAllEntriesRequestAndDeleted() {
    return this.entryService.readAllEntriesAndDeleted();
  }

  @Put('dev/entry/id=:id')
  @UseGuards(AuthGuard)
  @Roles('developer')
  restoreDeletedEntry(@Param('id') id) {
    return this.entryService.restoreEntry(id);
  }
}
