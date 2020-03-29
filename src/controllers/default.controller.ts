import { getRepository, getConnection, createConnection } from 'typeorm';
import { TestProfile } from '../entity/pg/profile';
import { Photo } from '../entity/mongo/photo';
import { TestUsers } from '../entity/ms-sql/testusers';

import * as express from 'express';
import Controller from '../interfaces/controller.interface';

class DefaultController implements Controller {

    path: string = '/default';

    router: express.Router = express.Router();
    constructor() {
        this.initialiseRoutes();
    }

    initialiseRoutes(): any {
        this.router.get(`${this.path}/testapi`, this.getDefaultData)
        this.router.get(`${this.path}/getpgdata`, this.getPGData)
        this.router.get(`${this.path}/getmongodata`, this.getMongoData)
        this.router.get(`${this.path}/getmssqldata`, this.getSQLData)
    }

    private getDefaultData = (req: express.Request, res: express.Response) => {
        res.send({ data: '1' });
    };

    private getPGData = (req: express.Request, res: express.Response) => {
        const pgconnections = getConnection("postgres_uat");

        pgconnections.getRepository(TestProfile)
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
        skuData.then(data => {
            res.send({ data: data });
        })
    };

    private getMongoData = (req: express.Request, res: express.Response) => {
        const mongoconnections = getConnection('mongocon_uat');

        mongoconnections.manager.findOne(Photo, { URL: 'About Trees and Me' }).then(aa => {
            res.send({ data: aa });
        });
    };

    private getSQLData = (req: express.Request, res: express.Response) => {
        const sqlconnections = getConnection('mssql_uat');

        sqlconnections.manager.find(TestUsers, { firstName: 'Satish' }).then(aa => {
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
