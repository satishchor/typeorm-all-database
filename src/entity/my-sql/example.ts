import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity({ database: 'mylocaldb', name: 'example' })
export class Example {

    @PrimaryColumn({name: 'id'})
    id: number;

    @Column({ name: 'name' })
    firstName: string;
 
    @Column({ name: 'lname' })
    lastName: string;
}