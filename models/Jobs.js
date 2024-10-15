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
        const query = 'SELECT * FROM jobs';
        connection.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM jobs WHERE user_id = ?';
        connection.query(query, [id], callback);
    },

    getByTechnicianID: (technician_id, callback) => {
        const query = 'SELECT * FROM jobs WHERE technician_id = ?';
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
