const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,  // Allow multiple connections
    queueLimit: 0
});

db.connect(err=> {
    if(err) console.error('Database connection failed', err);
    else console.log('Connected to MySql databse..');
});

module.exports = db;