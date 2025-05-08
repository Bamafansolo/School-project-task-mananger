
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: '0.0.0.0',
    user: 'root',
    password: 'password',
    database: 'task_manager',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = db;
