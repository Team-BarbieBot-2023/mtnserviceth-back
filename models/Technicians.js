const connection = require('../database');

const Technicians = {
    create: (data, callback) => {
        const query = `
            INSERT INTO technicians 
            (user_id, phone, address_id_card, current_address, emergency_contact, national_id, documents, pdpa_consent, work_history) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(query, [data.user_id, data.phone, data.address_id_card, data.current_address, data.emergency_contact, data.national_id, data.documents, data.pdpa_consent,
        data.work_history
        ],
            callback
        );
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM technicians';
        connection.query(query, callback);
    },

    getHistoryByTechnicians: (callback) => {
        const query = `SELECT
            a.*,
            b.NAME AS technicians_name,
            b.email AS technicians_email,
            b.image AS technicians_image,
            b.STATUS AS technicians_status 
                FROM technicians AS a
            LEFT JOIN users AS b ON (a.user_id = b.id)`;
        connection.query(query, callback);
    },

    updateStatus: (id, status) => {
        connection.query(`UPDATE technicians SET status = ${status} WHERE id=${id};`, callback);
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE technicians 
            SET phone = ?, emergency_contact = ?, national_id = ?, address_id_card = ?, 
                current_address = ?, work_history = ?, documents = ?
            WHERE id = ?
        `;
        connection.query(query, [
            data.phone,
            data.emergency_contact,
            data.national_id,
            data.address_id_card,
            data.current_address,
            data.work_history,
            data.documents,
            id
        ], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM technicians WHERE id = ?';
        connection.query(query, [id], callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM technicians WHERE id = ?';
        connection.query(query, [id], callback);
    },

    getByUserId: (id, callback) => {
        const query = 'SELECT * FROM technicians WHERE user_id = ?';
        connection.query(query, [id], callback);
    },

    updateStatus: (id, status, callback) => {
        const query = 'UPDATE technicians SET status = ? WHERE id = ?';
        connection.query(query, [status, id], callback);
    },

    updateCurrentJobs: (id, jobid, callback) => {
        const query = 'UPDATE technicians SET current_jobs = ? WHERE user_id = ?';
        connection.query(query, [jobid, id], callback);
    }
};

module.exports = Technicians;
