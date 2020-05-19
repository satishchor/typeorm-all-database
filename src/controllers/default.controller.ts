import { getRepository, getConnection, createConnection } from 'typeorm';
import * as alasql1 from 'alasql';
var alasql = require('alasql');

import { TestProfile } from '../entity/pg/profile';
import { Photo } from '../entity/mongo/photo';
import { TestUsers } from '../entity/ms-sql/testusers';
import { Example } from '../entity/my-sql/example';
import PersonModel from '../models/Person.model';

import * as express from 'express';
import Controller from '../interfaces/controller.interface';

class DefaultController implements Controller {

    path: string = '/default';
    private Person = PersonModel;
    router: express.Router = express.Router();
    constructor() {
        this.initialiseRoutes();
    }

    initialiseRoutes(): any {
        this.router.get(`${this.path}/testapi`, this.getDefaultData)
        this.router.get(`${this.path}/getmongoose`, this.getMongoose)
        this.router.get(`${this.path}/getpgdata`, this.getPGData)
        this.router.get(`${this.path}/getmongodata`, this.getMongoData)
        this.router.get(`${this.path}/getmssqldata`, this.getSQLData)
        this.router.get(`${this.path}/getmysqldata`, this.getMySQLData)
    }
    private getMongoose = async (req: express.Request, res: express.Response) => {
        this.Person.find().then(data => {
            res.send(data);
        }
        );
    };

    private getDefaultData = async (req: express.Request, res: express.Response) => {
        try {

            // alasql('=2*3', 1, 23, 4, 5);
            res.send({ data: '1' });
            // Good test  
            // Bad test 
            // This combination should generate type error

        }
        catch (e) {
            res.send((e as Error).message);
        }

    };

    private getMySQLData = async (req: express.Request, res: express.Response) => {
        const mysqlconnections = getConnection("mysql_uat");

        console.log('Calling My Sql data');


        console.log('MY-SQL');
        const example = new Example();
        example.firstName = "Komal";
        example.lastName = "Bhilare";
        await mysqlconnections.manager.save(example).then(aa => {
            console.log(aa);
        });

        await mysqlconnections.getRepository(Example)
            .createQueryBuilder('exampledata')
            .select('exampledata.name')
            .getRawMany().then(data => {
                console.log(data);

            });;


        var about = "Satish";
        var career = "SE";
        var query = `SELECT * from example`;
        var skuData = mysqlconnections.query(query);
        await skuData.then(data => {
            res.send({ data: data });
        })
    };

    private getPGData = async (req: express.Request, res: express.Response) => {
        const pgconnections = getConnection("postgres_uat");

        await pgconnections.getRepository(TestProfile)
            .createQueryBuilder('TestProfile')
            .select('TestProfile.about')
            .groupBy('TestProfile.about')
            .getRawMany().then(data => {
                console.log(data);
            });;

        var about = "Satish";
        var career = "SE";
        var query = `SELECT * from TestProfile where about= $1 and career= $2 `;
        var skuData = pgconnections.query(query, [about, career]);
        await skuData.then(data => {
            res.send({ data: data });
        })
    };

    private getMongoData = async (req: express.Request, res: express.Response) => {
        const mongoconnections = getConnection('mongocon_uat');

        await mongoconnections.manager.findOne(Photo, { URL: 'About Trees and Me' }).then(aa => {
            res.send({ data: aa });
        });
    };

    private getSQLData = async (req: express.Request, res: express.Response) => {
        const sqlconnections = getConnection('mssql_uat');

        await sqlconnections.manager.find(TestUsers, { firstName: 'Satish' }).then(aa => {
            console.log(aa);
        });

        var firstName = "Satish";
        var lastName = "Choraghe";
        var query = `SELECT * from TestUsers where firstName= @0 and lastName= @1 `;

        var skuData = sqlconnections.query(query, ['Satish', 'Choraghe']);
        skuData.then(aa => {
            res.send({ data: aa });
        })
    };
}

export default DefaultController;
