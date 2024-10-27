const connection = require('../database');

const Line = {
    getLineByUserID: (id, callback) => {
        const query = 'SELECT * FROM line WHERE user_id = ?';
        connection.query(query, [id], callback);
    },

    update: (id, data, callback) => {
        const query = 'UPDATE line SET line_id = ? WHERE user_id = ?';
        connection.query(query, [data.line_id, id], callback);
    },
};

module.exports = Line;
