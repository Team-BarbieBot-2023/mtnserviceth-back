const connection = require('../database');

const Review = {
    create: (data, callback) => {
        const query = 'INSERT INTO reviews (job_id, user_id, technician_id, rating, comment, created_at) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [data.job_id, data.user_id, data.technician_id, data.rating, data.comment, new Date()], callback);
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM reviews';
        connection.query(query, callback);
    },

    update: (id, data, callback) => {
        const query = 'UPDATE reviews SET  rating = ?, comment = ?, created_at = ? WHERE id = ?';
        connection.query(query, [data.rating, data.comment, new Date(), id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM reviews WHERE id = ?';
        connection.query(query, [id], callback);
    },

    getReviewByUserID: (id, callback) => {
        const query = 'SELECT * FROM reviews WHERE user_id = ?';
        connection.query(query, [id], callback);
    },
};

module.exports = Review;
