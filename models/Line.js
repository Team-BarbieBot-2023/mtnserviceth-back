const connection = require('../database');

const Line = {
    getLineAll: async (callback) => {
        const query = 'SELECT * FROM line';
        connection.query(query, callback);
    },

    getLineByLineID: async (id, callback) => {
        const query = 'SELECT * FROM line WHERE line_id = ?';
        connection.query(query, [id], callback);
    },

    getLineByUserID: (id, callback) => {
        const query = 'SELECT * FROM line WHERE user_id = ?';
        connection.query(query, [id], callback);
    },

    update: async (data, callback) => {
        const query = 'UPDATE line SET line_id = ?, status = ? WHERE user_id = ?';
        connection.query(query, [data.line_id, data.status, data.user_id], callback);
    },
};

module.exports = Line;
