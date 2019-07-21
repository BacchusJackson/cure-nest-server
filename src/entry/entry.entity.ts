import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from "typeorm";
import { ActivityEntity } from "../activity/activity.entity";
import { UserEntity } from "../users/user.entity";
import { EntryRO } from "./entry.dto";

@Entity('ENTRY_TABLE')
export class EntryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('datetime')
    autoCreatedDate: Date;

    @Column('bit')
    active: boolean;

    @Column('datetime')
    entryDate: Date;

    @Column('text')
    details: string;

    @ManyToOne(type => UserEntity, user => user.entries)
    author: UserEntity;

    @ManyToOne(type => ActivityEntity, activity => activity.entries)
    activity: ActivityEntity;



    @BeforeInsert()
    async addMetadata() {
        this.active = true;
        this.autoCreatedDate = new Date();
    }

}