import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as mongoose from 'mongoose';
import * as socketIo from 'socket.io';
import * as cors from 'cors';

import Controller from './interfaces/controller.interface';
import PersonModel from './models/Person.model';
import { SocketEvent } from './models/constants'

class GlobalApp {

    public app: express.Application;
    public port: number;
    public host: string;
    public server: any;
    public io: SocketIO.Server;
    private person = PersonModel;

    constructor(controller: Controller[]) {
        this.app = express(); 
        this.startChangeStream();
        // this.connectToDB();
        this.registerAllRoutes(controller);

        this.app.use(cors());
        this.app.options('*', cors());
        this.listenApp();

        this.initSocket();
        this.listen();

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
        this.server = this.app.listen(this.port, this.host, () => {
            console.log('Application is Listening on Host: ' + this.host + ' and Port: ' + this.port);
        })
    }

    public connectToDB() {
        mongoose.connect('mongodb://localhost:27017/ecom', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('Mongoose DB Connected');
        },
            err => {
                console.log('Not Connected' + err);
            }
        );
    }
  
    public async startChangeStream() {
        // Make sure you're using mongoose >= 5.0.0
        console.log(new Date(), `mongoose version: ${mongoose.version}`);

        //   await setupReplicaSet();

        // Connect to the replica set
        //192.168.0.106
        const uri = 'mongodb://localhost:27017,localhost:27020,localhost:27021/' +
            'ecom?replicaSet=r2cip'; 
        await mongoose.connect(uri); 
        // For this example, need to explicitly create a collection, otherwise
        // you get "MongoError: cannot open $changeStream for non-existent database: test"

        this.person.watch().
            on('change', data => {
                console.log(new Date(),
                    data
                );
                this.io.emit('message', JSON.stringify(data));
            });

        // Insert a doc, will trigger the change stream handler above
    }

    private initSocket(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        // server listening on our defined port

        //socket events
        this.io.on(SocketEvent.CONNECT, (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            socket.on(SocketEvent.MESSAGE, (m: { data: 'abc' }) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });
            socket.on(SocketEvent.DISCONNECT, () => {
                console.log('Client disconnected');
            });
        });
    }
}

export default GlobalApp;

