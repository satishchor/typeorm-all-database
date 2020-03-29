import { createConnection, Connection } from "typeorm";

const connections = createConnection({
    name: "db1Connection",
    type: "mongodb",
    host: "localhost",
    port: 8015,
    username: "Satish",
    password: "Satish@1234",
    database: "satishdb",
    entities: [__dirname + "/entity/*{.js,.ts}"],
    synchronize: true
});
export default connections;