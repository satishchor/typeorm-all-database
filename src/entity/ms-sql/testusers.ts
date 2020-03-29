import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ database: 'MY_DEV', schema: 'dbo', name: 'TestUsers' })
export class TestUsers {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'FirstName' })
    firstName: string;
 
    @Column({ name: 'LastName' })
    lastName: string;

}