import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { EntryDTO, EntryRO } from "./entry.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntryEntity } from './entry.entity';
import { UserEntity } from '../users/user.entity';
import { ActivityEntity } from '../activity/activity.entity';

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
  async createEntry(userID: string, data: EntryDTO) {
    data.details = JSON.stringify(data.details);
    const user = await this.userRepository.findOne({ where: { id: userID } });
    const activity = await this.activityRepository.findOne({ where: { id: data.activityID } });

    delete data.activityID;

    
    const entry = await this.entryRepository.create({ ...data, author: user, activity });
    await this.entryRepository.save(entry);

    return this.entryToResponseObject(entry);

  }

  // C[R]UD
  async readAllEntries() {

    const entries = await this.entryRepository.find({ relations: ['author'], where: { active: true } });

    return entries.map(entry => this.entryToResponseObject(entry));

  }

  // CRU[D]
  async deleteEntry(entryID: string) {
    const entry = await this.entryRepository.findOne({ where: { id: entryID } });

    if (!entry) {
      throw new HttpException('Entry Not Found', HttpStatus.NOT_FOUND);
    }
    await this.entryRepository.update({ id: entryID }, { active: false });
    return { success: true };

  }

}
