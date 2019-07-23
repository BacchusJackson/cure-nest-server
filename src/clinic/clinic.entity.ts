import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BeforeInsert } from "typeorm";
import { UserEntity } from "../users/user.entity";

@Entity('CLINIC_TABLE')
export class ClinicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bit')
  active: boolean

  @Column('datetime')
  autoCreatedDate: Date;

  @Column('text')
  name: string;

  @Column('text')
  site: string;

  @OneToMany(type => UserEntity, user => user.clinic)
  users: UserEntity[];

  @BeforeInsert()
  async addMetadata() {
    this.autoCreatedDate = new Date();
    this.active = true;
  }

  toResponseObject() {
    const { id, name, site } = this;

    const responseObject = { id, name, site };

    return responseObject;
  }
}