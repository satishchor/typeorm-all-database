import { getConnection } from "typeorm";
import { User } from "./entity/User";


// const db1Connection = getConnection("db1Connection");
// // you can work with "db1" database now...
// // db1Connection.connect().then(aa => {
// //     console.log('Checking Connections');
// //     console.log(aa.isConnected);
// // });

// try {
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Satish";
//     user.lastName = "Choraghe";
//     user.age = 26;
//     db1Connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);
// } catch (Error) {
//     console.log(Error.message);
// }


// const db2Connection = getConnection("db2Connection");
// you can work with "db2" database now...