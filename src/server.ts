import DefaultController from './controllers/default.controller';
import GlobalApp from './app';
import DataBaseConfig from './index'

var app = new GlobalApp(
    [
        new DefaultController()
    ]);

 var data = new DataBaseConfig();
 data.CreateConnection(false);
 
app.listenApp();

