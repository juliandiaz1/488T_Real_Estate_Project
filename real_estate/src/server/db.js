const mysql = require("mysql");

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'realestate.cy4khj9gnpnt.us-west-2.rds.amazonaws.com',
    user: 'team',
    password: 'Realestate123',
    database: 'RealEstate'
});

module.exports = db;