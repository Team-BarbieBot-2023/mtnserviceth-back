const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '119.59.118.88',
    user: 'dev',
    password: 'N0p@22w0rd',
    database: 'mtnseviceth',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = connection;
