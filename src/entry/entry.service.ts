import { Injectable } from '@nestjs/common';
import { Entry, NewEntry, Response } from '../interfaces/entryCollection.interface'

@Injectable()
export class EntryService {

  createEntry(newEntry: NewEntry): Response {

    newEntry.dateCreated = new Date();
    newEntry.active = true;

    try {
      // TODO: Insert SQL Command
      return { success: true, message: null };
    } catch (err) {
      return { success: false, message: err };
    }
  }

  readAllEntries(): Response {

    try {
      // TODO: Select SQL Command
      return { success: true, message: null, entries: [fakeEntry, fakeEntry, fakeEntry]}
    } catch (err) {
      return { success: false, message: err}
    }
  }

  deleteEntry(entryID: string): Response {

    try {
      // TODO: Update SQL Command ActiveBit = 0
      return { success: true, message: null }
    } catch (err) {
      return { success: false, message: err }
    }
  }

  private getEntryByID(entryID: string): Entry {

    if (entryID == '123') {
      return fakeEntry;
    }
    return null;
  }
}

export const fakeEntry: Entry = {
  entryID: '123',
  dateCreated: new Date(),
  active: true,
  date: new Date(),
  category: 'Team Event',
  activity: 'Fun Day',
  details: {
    members: 10,
    hours: 20,
    description: 'talked about drug prevention'
  },
  username: 'Joe',
  site: 'Langley',
  clinic: 'Mental Health'
}
