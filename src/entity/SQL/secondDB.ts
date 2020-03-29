import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({ database: 'MY_DEV', schema:'dbo' })
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

}