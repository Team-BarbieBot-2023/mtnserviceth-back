const connection = require('../database');

const User = {
    create: (data, callback) => {
        const query = 'INSERT INTO users (email, image, name, role, status) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [data.email, data.image, data.name, data.role, data.status], callback);
    },
    
    getAll: (callback) => {
        const query = 'SELECT * FROM users';
        connection.query(query, callback);
    },
    
    update: (id, data, callback) => {
        const query = 'UPDATE users SET email = ?, image = ?, name = ?, role = ?, status = ? WHERE id = ?';
        connection.query(query, [data.email, data.image, data.name, data.role, data.status, id], callback);
    },
    
    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        connection.query(query, [id], callback);
    }
};

module.exports = User;
