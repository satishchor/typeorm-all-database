import { Entity, PrimaryGeneratedColumn, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity({ name: 'TestProfile' })
export class TestProfile {

    @PrimaryGeneratedColumn({ name: '_id' })
    _id: number;

    @Column()
    about: string;

    @Column()
    education: string;

    @Column()
    career: string;

}