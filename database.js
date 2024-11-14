const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: '10.200.200.1',
//     user: 'navicat_user',
//     password: 'n0P@22w0rd',
//     database: 'mtnseviceth',
//     multipleStatements: true
// });

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0P@22w0rd',
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
