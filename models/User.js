const connection = require('../database');

const User = {
    create: (data, callback) => {
        const query = 'INSERT INTO users (email, image, name, role, status, _id) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [data.email, data.image, data.name, data.role, data.status, data._id], callback);
    },

    getUserByAdmin: (callback) => {
        const query = `SELECT u.name,u.id,u.image,u.email 
        FROM users As u
        WHERE u.role ='A'`;
        connection.query(query, callback);
    },
    getTechniciansByAdmin: (callback) => {
        const query = `SELECT u.name,
            u.id,u.image,
            u.email,
            IFNULL(t.phone,'') AS phone,
            IFNULL(t.status,'') AS status,c
            IFNULL(t.complaint_count,0) AS complaint_count,
            IFNULL(t.experience_level,0) AS experience_level,
            IFNULL(t.id,0) AS technician_id
            FROM users As u
            LEFT JOIN technicians AS t ON (u.id = t.user_id)
            WHERE u.role ='T'`;
        connection.query(query, callback);
    },


    getAll: (callback) => {
        const query = 'SELECT * FROM users';
        connection.query(query, callback);
    },

    update: (id, data, callback) => {
        const query = 'UPDATE users SET email = ?, image = ?, name = ?, role = ?, status = ?, _id = ? WHERE id = ?';
        connection.query(query, [data.email, data.image, data.name, data.role, data.status, data._id, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        connection.query(query, [id], callback);
    },

    getByEmail: (email, callback) => {
        const query = "SELECT * FROM users WHERE email = ?";
        connection.query(query, [email], callback);
    },

    getByid: async (id, callback) => {
        const query = "SELECT * FROM users WHERE id = ?";
        connection.query(query, [id], callback);
    },

    getBy_id: (id, callback) => {
        const query = "SELECT * FROM users WHERE _id = ?";
        connection.query(query, [id], callback);
    },

    updateRole: (id, data, callback) => {
        const query = 'UPDATE users SET role = ? WHERE _id = ?';

        connection.query(query, [data.role, id], (err, results) => {
            if (err) {
                console.error('Error updating role:', err);
                return callback(err, null);
            }

            const selectQuery = 'SELECT * FROM users WHERE _id = ?';
            connection.query(selectQuery, [id], (err, updatedResults) => {
                if (err) {
                    console.error('Error fetching updated user:', err);
                    return callback(err, null);
                }
                return callback(null, updatedResults[0]);
            });
        });
    }

};

module.exports = User;
