import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('bit')
  active: boolean;

  @Column({ nullable: true, type: 'datetime' })
  created?: Date;
}