import pg from "pg";
import dotevn from 'dotenv'
dotevn.config();
var db = new pg.Client({
    host: process.env.host,
    port: process.env.port,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
})
export default db;
