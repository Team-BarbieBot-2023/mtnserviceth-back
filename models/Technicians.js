const connection = require('../database');

const Technicians = {
    create: (data, callback) => {


        const query = `
            INSERT INTO technicians 
            (user_id, phone, address_id_card, current_address, emergency_contact, national_id, documents, pdpa_consent, work_history) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(query,[data.user_id,data.phone,data.address_id_card,data.current_address,data.emergency_contact,data.national_id,data.documents,data.pdpa_consent,
                data.work_history
            ],
            callback
        );
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM technicians';
        connection.query(query, callback);
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE technicians 
            SET user_id = ?, phone = ?, address_id_card = ?, current_address = ?, 
                emergency_contact = ?, national_id = ?, documents = ?, pdpa_consent = ?, 
                experience_level = ?, work_history = ?, current_jobs = ?, status = ? 
            WHERE _id = ?
        `;
        connection.query(query, [
            data.user_id,
            data.phone,
            data.address_id_card,
            data.current_address,
            data.emergency_contact,
            data.national_id,
            data.documents,
            data.pdpa_consent,
            data.experience_level,
            data.work_history,
            data.current_jobs,
            data.status,
            id
        ], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM technicians WHERE _id = ?';
        connection.query(query, [id], callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM technicians WHERE _id = ?';
        connection.query(query, [id], callback);
    },

    updateStatus: (id, status, callback) => {
        const query = 'UPDATE technicians SET status = ? WHERE _id = ?';
        connection.query(query, [status, id], callback);
    }
};

module.exports = Technicians;
