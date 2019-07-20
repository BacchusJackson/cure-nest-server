import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bit')
  active: boolean;

  @Column('datetime')
  dbOriginDate: Date;

  @Column('datetime')
  dbLastLogOn: Date;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  displayName: string;

  @Column({nullable: true, type: 'uuid'})
  siteClinicID: string;

}