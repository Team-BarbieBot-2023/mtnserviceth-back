const connection = require('../database');

const Jobs = {
    create: (data, callback) => {
        const query = `
            INSERT INTO jobs 
            (user_id, technician_id, phone, job_title, job_type, scheduled_datetime, 
             urgency, job_description, status, customer_details, img_description, 
             completion_confirmed, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        connection.query(
            query,
            [
                data.user_id,
                data.technician_id || null,
                data.phone,
                data.job_title,
                data.job_type,
                data.scheduled_datetime,
                data.urgency,
                data.job_description,
                data.status,
                JSON.stringify(data.customer_details),
                JSON.stringify(data.img_description),
                data.completion_confirmed
            ],
            callback
        );
    },

    getAll: (callback) => {
        const query = "SELECT * FROM jobs AS a WHERE a.technician_id IS NULL";
        connection.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM jobs WHERE user_id = ?';
        connection.query(query, [id], callback);
    },

    getByTechnicianID: (technician_id, callback) => {
        const query = 'SELECT * FROM jobs WHERE technician_id = ? ORDER BY status DESC';
        connection.query(query, [technician_id], callback);
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE jobs 
            SET user_id = ?, technician_id = ?, phone = ?, job_title = ?, job_type = ?, 
                scheduled_datetime = ?, urgency = ?, job_description = ?, status = ?, 
                customer_details = ?, img_description = ?, 
                completion_confirmed = ?, updated_at = NOW() 
            WHERE id = ?
        `;
        connection.query(
            query,
            [
                data.user_id || null,
                data.technician_id || null,
                data.phone,
                data.job_title,
                data.job_type,
                data.scheduled_datetime,
                data.urgency,
                data.job_description,
                data.status,
                JSON.stringify(data.customer_details),
                JSON.stringify(data.img_description),
                data.completion_confirmed,
                id
            ],
            callback
        );
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE jobs 
            SET user_id = ?, technician_id = ?, phone = ?, job_title = ?, job_type = ?, 
                scheduled_datetime = ?, urgency = ?, job_description = ?, status = ?, 
                customer_details = ?, img_description = ?, 
                completion_confirmed = ?, updated_at = NOW() 
            WHERE id = ?
        `;
        connection.query(
            query,
            [
                data.technician_id || null,
                data.phone,
                data.job_title,
                data.job_type,
                data.scheduled_datetime,
                data.urgency,
                data.job_description,
                data.status,
                JSON.stringify(data.customer_details),
                JSON.stringify(data.img_description),
                data.completion_confirmed,
                id
            ],
            callback
        );
    },

    updateStatus: (id, data, callback) => {
        const query = `UPDATE jobs SET technician_id = ?, status = ?, updated_at = NOW() WHERE id = ?`;
        connection.query(
            query,
            [
                data.technician_id || null,
                data.status,
                id
            ],
            callback
        );
    },

    updateStatusCompleted: (id, data, callback) => {
        const query = `UPDATE jobs SET status = ?, updated_at = NOW() WHERE id = ?`;
        connection.query(
            query,
            [
                data.status,
                id
            ],
            callback
        );
    },

    getByJobId: (id, callback) => {
        const query = `SELECT j.id AS job_id,t.id AS technician_id,j.job_type,j.job_description,u.name FROM jobs AS j 
        LEFT JOIN technicians AS t ON (t.id=j.technician_id)
        LEFT JOIN users AS u ON (u.id = t.user_id) WHERE j.id = ?`;
        connection.query(query, [id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM jobs WHERE id = ?';
        connection.query(query, [id], callback);
    },

    updateStatus: (id, status, callback) => {
        const query = 'UPDATE jobs SET status = ?, updated_at = NOW() WHERE id = ?';
        connection.query(query, [status, id], callback);
    }
};

module.exports = Jobs;
