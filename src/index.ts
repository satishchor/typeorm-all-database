import "reflect-metadata";
import { createConnection, createConnections, getConnection, getRepository, getConnectionOptions } from "typeorm";
import { Users } from "./entity/ms-sql/users";
import { Profile } from "./entity/pg/profile";
import { Photo } from "./entity/mongo/photo";
import { getMongoManager, getMongoRepository, MssqlParameter } from "typeorm";
import { type } from "os";


class DataBaseConfig {
    
    constructor(){

    }
    public CreateConnection(testinsert: boolean) {
        // read connection options from ormconfig file (or ENV variables)
        try {

            console.log('Connecting Databases..');
            const connections = createConnections();

            //Sample Testing Insert Operations
            if (testinsert) {
                connections.then(async connection => {

                    console.log('MONGO');
                    const manager2 = getMongoRepository(Photo, 'mongocon_uat');
                    const timber1 = await manager2.insertMany([{
                        URL: "About Trees and Me",
                    }]).then(aa => {
                        console.log(aa);
                    });

                    console.log('PG');
                    const profile = new Profile();
                    profile._id = 0;
                    profile.about = 'Satish';
                    profile.career = 'SE';
                    profile.education = 'BSC';
                    await connection[1].manager.save(profile).then(aa => {
                        console.log(aa);
                    });

                    console.log('MS-SQL');
                    const user1 = new Users();
                    user1.firstName = "Satish";
                    user1.lastName = "Choraghe";
                    await connection[2].manager.save(user1).then(aa => {
                        console.log(aa);
                    });

                }).catch(error => console.log(error));
            }

        } catch (Error) {
            console.log(Error);
        }
    }
}

class DataBaseArray {

    public CreateConnection() {
        try {
            const connections = createConnections([{
                name: "db1Connection",
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres",
                password: "Satish@1234",
                database: "postgres",
                synchronize: false,
                logging: false,
                entities: [__dirname + "/entity/PG/*{.js,.ts}"]
            },
            {
                name: "db2Connection",
                type: "mongodb",
                host: "localhost",
                port: 8015,
                username: "Satish",
                password: "Satish#1234",
                database: "satishdb",
                synchronize: false,
                logging: false,
                entities: [__dirname + "/entity/MONGO/*{.js,.ts}"]
            },
            {
                name: "db3Connection",
                type: "mssql",
                host: "CHORGHE-PC",
                port: 1433,
                username: "satish",
                password: "Satish#1234",
                database: "MY_DEV",
                synchronize: false,
                logging: false,
                entities: [__dirname + "/entity/SQL/*{.js,.ts}"]
            }]);

            connections.then(async connection => {

                console.log('PG');
                const profile = new Profile();
                profile._id = 0;
                profile.about = 'Satish';
                profile.career = 'SE';
                profile.education = 'BSC';
                await connection[0].manager.save(profile).then(aa => {
                    console.log(aa);
                });


                console.log('MONGO');
                const manager2 = getMongoRepository(Photo, connection[1].name);
                const timber1 = await manager2.insertMany([{
                    URL: "About Trees and Me",
                }]).then(aa => {
                    console.log(aa);
                });

                console.log('MS-SQL');
                const user1 = new Users();
                user1.firstName = "Satish";
                user1.lastName = "Choraghe";
                await connection[2].manager.save(user1).then(aa => {
                    console.log(aa);
                });

            }).catch(error => console.log(error));


        } catch (Error) {
            console.log(Error.message);
        }
    }
}


export default DataBaseConfig;