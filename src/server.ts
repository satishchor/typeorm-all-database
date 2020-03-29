import { DataBaseConfig } from './index'
import { getRepository, getConnection, createConnection } from 'typeorm';
import { Profile } from './entity/pg/profile';
import { Photo } from './entity/mongo/thirdDB';
import { Users } from './entity/mssql/secondDB';


var mdata: any;

//This is used to test the Insert Data.
var executes = new DataBaseConfig();
// executes.CreateConnection(false);

const connections = createConnection('mongocon_uat');

connections.then(connection => {
    connection.manager.findOne(Photo, { URL: 'About Trees and Me' }).then(aa => {
        console.log(aa);
    }); 
}); 


const pgconnections = createConnection('postgres_uat');

pgconnections.then(async connection => {
    connection.manager.find(Profile, { about: 'Satish' }).then(aa => {
        console.log(aa);
        mdata = aa;
    });

    await connection.getRepository(Profile)
        .createQueryBuilder('Profile')
        .select('Profile.about')
        .groupBy('Profile.about')
        .getRawMany().then(aa => {
            console.log(aa);
        });;

    var about = "Satish";
    var career = "SEE";
    var query = `SELECT * from profile where about= $1 and career= $2 `;
    var skuData = connection.query(query, [about, career]);
    skuData.then(aa => {
        console.log(aa);
    })

});


const sqlconnections = createConnection('mssql_uat');

sqlconnections.then(async connection => {
    connection.manager.find(Users, { firstName: 'Satish' }).then(aa => {
        console.log(aa);
    });

    var firstName = "Satish";
    var lastName = "Choraghe";
    var query = `SELECT * from Users where firstName= @0 and lastName= @1 `;
    
    var skuData = connection.query(query, ['Satish', 'Choraghe']);
    skuData.then(aa => {
        console.log(aa);
    })

});

console.log({ data: mdata });


