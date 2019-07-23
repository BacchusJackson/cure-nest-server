import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { EntryDTO, EntryRO } from "./entry.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntryEntity } from './entry.entity';
import { UserEntity } from '../users/user.entity';
import { ActivityEntity } from '../activity/activity.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(EntryEntity)
    private entryRepository: Repository<EntryEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>
  ) { }

  private entryToResponseObject(entry: EntryEntity): EntryRO {
    const { id, entryDate, details, author } = entry;
    let detailsObj = null;


    try {
      detailsObj = JSON.parse(details);

    } catch (err) {
      Logger.error('JSON Parsing Error on Detail', '**EntryService');
    }
    const activity = entry.activity ? entry.activity.toLinkObject() : null;

    const responseObject: any = { id, entryDate, detailsObj, activity };

    responseObject.author = author ? { userID: author.id, username: author.username } : null;

    return responseObject;
  }
  // [C]RUD
  async createEntry(token: string, data: EntryDTO) {

    const decodedToken: any = await jwt.verify(token, process.env.SECRET);

    const { id } = decodedToken;

    data.details = JSON.stringify(data.details);
    const user = await this.userRepository.findOne({ where: { id: id, active: true } });
    const activity = await this.activityRepository.findOne({ where: { id: data.activityID, active: true } });

    if (!activity) {
      console.log('Activity Not Found');
      throw new HttpException('Activity Not Found', HttpStatus.BAD_REQUEST);
    }

    delete data.activityID;

    const entry = await this.entryRepository.create({ ...data, author: user, activity });
    await this.entryRepository.save(entry);

    const responseObject = this.entryToResponseObject(entry);

    Logger.log(responseObject, '**NewEntry');

    return responseObject;

  }

  // C[R]UD
  async readAllEntries() {

    const entries = await this.entryRepository.find({ relations: ['author', 'activity'], where: { active: true } });

    return entries.map(entry => this.entryToResponseObject(entry));

  }

  async readAllEntriesAndDeleted() {

    const entries = await this.entryRepository.find({ relations: ['author', 'activity'] });

    return entries.map(entry => this.entryToResponseObject(entry));
  }

  async readEntry(id: string) {
    const entry = await this.entryRepository.findOne({ relations: ['author', 'activity'], where: { id } });

    if (!entry) {
      throw new HttpException('Entry Not Found', HttpStatus.NOT_FOUND);
    }
    const responseObject = this.entryToResponseObject(entry);

    return responseObject;
  }

  // CRU[D]
  async deleteEntry(entryID: string, token) {

    const decodedUser: any = await jwt.verify(token, process.env.SECRET);
    const { username, id } = decodedUser;

    const entry = await this.entryRepository.findOne({ where: { id: entryID }, relations: ['author'] });

    if (!entry) {
      throw new HttpException('Entry Not Found', HttpStatus.NOT_FOUND);
    }
    console.log('entry author id -> ' + entry.author.id);
    console.log('user ID -> ' + id);

    if(entry.author.id !== id) {
      throw new HttpException('Invalid Permissions', HttpStatus.UNAUTHORIZED);
    }

    await this.entryRepository.update({ id: entryID }, { active: false });
    return { success: true };

  }

  async adminDeleteEntry(entryID: string) {
    const entry = await this.entryRepository.findOne({ where: { id: entryID } });

    if (!entry) {
      throw new HttpException('Entry Not Found', HttpStatus.NOT_FOUND);
    }
    await this.entryRepository.update({ id: entryID }, { active: false });
    return { success: true };

  }

  async restoreEntry(entryID: string) {
    const entry = await this.entryRepository.findOne({ where: { id: entryID }, relations: ['author', 'activity'] });

    if (!entry) {
      throw new HttpException('Entry Not Found', HttpStatus.NOT_FOUND);
    }
    await this.entryRepository.update({ id: entryID }, { active: true });

    const responseObject = this.entryToResponseObject(entry);

    return responseObject;

  }

}
