import "reflect-metadata";
import { createConnection, createConnections, getConnection, getRepository, getConnectionOptions } from "typeorm";
import { TestUsers } from "./entity/ms-sql/testusers";
import { TestProfile } from "./entity/pg/profile";
import { Photo } from "./entity/mongo/photo";
import { Example } from "./entity/my-sql/example";
import { getMongoManager, getMongoRepository, MssqlParameter } from "typeorm";
import { type } from "os";


class DataBaseConfig {
    
    constructor(){

    }
    public CreateConnection(testinsert: boolean) {
        // read connection options from ormconfig file (or ENV variables)
        try {
 
            console.log('Connecting Databases..');
            // const connections = createConnections();

            //Sample Testing Insert Operations
            
        } catch (Error) {
            console.log(Error);
        }
    }
}


export default DataBaseConfig;