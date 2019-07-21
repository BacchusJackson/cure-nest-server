import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import { ActivityRO } from "./activity.dto";
import { EntryEntity } from "../entry/entry.entity";

@Entity('ACTIVITY_TABLE')
export class ActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bit')
  active: boolean;

  @Column('datetime')
  autoCreatedDate: Date;

  @Column('text')
  name: string;

  @Column('text')
  category: string;

  @Column('text')
  properties: string;

  @OneToMany(type => EntryEntity, entry => entry.activity)
  entries: EntryEntity[];

  
  @BeforeInsert()
  async addMetadata() {
    this.active = true;
    this.autoCreatedDate = new Date();
  }

  toResponseObject() {
    const { id, name, category, properties } = this;

    const responseObject: ActivityRO = { id, name, category, properties };

    return responseObject;
  }

  toLinkObject() {
    const { id, name, category } = this;

    const linkObject:Partial<ActivityRO> = { id, name, category };

    return linkObject
  }
}