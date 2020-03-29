import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({ database: "satishdb",name:'Photo' })
export class Photo {

    @Column({ primary: true, name: '_id' })
    _id: string;

    @Column('URL')
    URL: string;

}