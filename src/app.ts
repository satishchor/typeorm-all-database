import * as express from 'express';
import * as bodyparser from 'body-parser';

import Controller from './interfaces/controller.interface';

class GlobalApp {

    public app: express.Application;
    public port: number;
    public host: string;

    constructor(controller: Controller[]) {
        this.app = express();
        this.registerAllRoutes(controller);
    }

    registerAllRoutes(controller: Controller[]): any {
        controller.forEach((controller) => {
            this.app.use('/api', controller.router);
        })
    }

    public listenApp() {
        this.port = 4002;
        this.host = 'localhost';
        console.log('Application is Staring....');
        this.app.listen(this.port, this.host, () => {
            console.log('Application is Listening on Host: ' + this.host + ' and Port: ' + this.port);
        })
    }
}

export default GlobalApp;

