require('dotenv').config();
import "reflect-metadata";
const server = require('./server')
import { createConnection } from 'typeorm';
import Note  from './models/notes';

createConnection ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'server',
    password: 'password',
    database: 'notesdb',
    ssl: false,
    entities: [Note],
    logging: ['query', 'error'],
    synchronize: true,
}).then( connection => {
    console.log('Database connection established');
    const port = process.env.PORT || 4000
    server.listen(port, () => console.log(`API server started on ${port}`))
}).catch(err => {
    console.log(err);
});





