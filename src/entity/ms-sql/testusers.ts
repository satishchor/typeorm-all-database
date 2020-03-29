import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ database: 'MY_DEV', schema: 'dbo', name: 'TestUsers' })
export class TestUsers {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

}