import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from "./user.dto";
import { EntryEntity } from "../entry/entry.entity";

@Entity('USERS_TABLE')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bit')
  active: boolean;

  @Column('datetime')
  autoCreatedDate: Date;

  @Column('datetime')
  autoLastLogOn: Date;

  @Column({ unique: true })
  username: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  displayName: string;

  
  @Column({nullable: true, type: 'uuid'})
  siteClinicID: string;
  
  @Column('text')
  password: string;
  
  @Column({nullable: true, type: 'text'})
  roles: string;

  @OneToMany(type => EntryEntity, entry => entry.author)
  entries: EntryEntity[];

  @BeforeInsert()
  async addMetadata() {
    this.password = await bcrypt.hash(this.password, 11);
    this.roles = "user";
    this.active = true;
    this.autoCreatedDate = new Date();
    this.autoLastLogOn = new Date();
    this.displayName = `${this.firstName} ${this.lastName}`;
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, username, firstName, lastName, displayName, autoLastLogOn, autoCreatedDate, roles } = this;

    const responseObject: UserRO = {
      id, username, firstName, lastName,
      displayName, lastLogOn: autoLastLogOn, created: autoCreatedDate, roles
    }

    if(showToken) {
      responseObject.token = this.token;
    }

    return responseObject;
  }

  private get token(): string {
    const { id, username, roles } = this;
    return jwt.sign({ id, username, roles }, process.env.SECRET, { expiresIn: '7d' });
  }
}