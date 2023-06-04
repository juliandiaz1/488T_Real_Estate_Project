const mysql = require("mysql");

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'realestate.cxvcocs18jru.us-east-1.rds.amazonaws.com',
    user: 'team',
    password: 'Realestate123',
    database: 'RealEstate'
});

module.exports = db;