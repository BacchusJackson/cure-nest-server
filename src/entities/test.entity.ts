import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
    export class Test {
        @PrimaryGeneratedColumn('uuid')
        TEST_ID: string;
        
        @Column({length: 256})
        TEST_NAME_TXT: string;
        
        @Column()
        ACTIVE_BIT: boolean;
    }