require('dotenv').config();
import "reflect-metadata";
const server = require('./server')
import { createConnection } from 'typeorm';
import Note  from './models/notes';

createConnection ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    ssl: false,
    entities: [Note],
    //logging: ,
    synchronize: true,
}).then( connection => {
    console.log('Database connection established');
    const port = process.env.PORT || 4000
    server.listen(port, () => console.log(`API server started on ${port}`))
}).catch(err => {
    console.log(err);
});





