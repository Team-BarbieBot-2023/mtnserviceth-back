const connection = require('../database');

const Complaints = {
    create: (data, callback) => {
        const query = `
            INSERT INTO complaints 
            (user_id, technician_id, job_id, complaint_title, complaint_description, 
             complaint_date, status, resolution, resolved_at, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        connection.query(
            query,
            [
                data.user_id,
                data.technician_id || null,
                data.job_id || null,
                data.complaint_title,
                data.complaint_description,
                data.complaint_date,
                data.status,
                data.resolution || null,
                data.resolved_at || null
            ],
            callback
        );
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM complaints';
        connection.query(query, callback);
    },
    getMyComplants: (id, callback) => {
        const query = `SELECT c.user_id ,
        c.complaint_title,
        c.complaint_description,
        c.status,
        IFNULL(c.resolution,'รอดำเนินการ') AS resolution,
        c.resolved_at,
        c.complaint_date,
        DATE_FORMAT(c.updated_at, '%Y-%m-%d %H:%i:%s') AS updated_at ,
        c.created_at,
        j.job_title,j.job_description,j.status AS job_status FROM complaints AS c
        LEFT JOIN jobs AS j ON (c.job_id = j.id) WHERE c.user_id = ? ORDER BY created_at DESC`;
        connection.query(query, [id], callback);
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM complaints WHERE user_id = ?';
        connection.query(query, [id], callback);
    },
    getByTechnicianID: (technician_id, callback) => {
        const query = 'SELECT * FROM complaints WHERE technician_id = ?';
        connection.query(query, [technician_id], callback);
    },
    update: (id, data, callback) => {
        const query = `
            UPDATE complaints 
            SET user_id = ?, technician_id = ?, job_id = ?, complaint_title = ?, 
                complaint_description = ?, complaint_date = ?, status = ?, 
                resolution = ?, resolved_at = ?, updated_at = NOW() 
            WHERE complaint_id = ?
        `;
        connection.query(
            query,
            [
                data.user_id || null,
                data.technician_id || null,
                data.job_id || null,
                data.complaint_title,
                data.complaint_description,
                data.complaint_date,
                data.status,
                data.resolution || null,
                data.resolved_at || null,
                id
            ],
            callback
        );
    },
    updateStatus: (id, data, callback) => {
        const query = `UPDATE complaints SET technician_id = ?, status = ?, updated_at = NOW() WHERE id = ?`;
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
        const query = 'DELETE FROM complaints WHERE id = ?';
        connection.query(query, [id], callback);
    },
    updateStatus: (id, status, callback) => {
        const query = 'UPDATE complaints SET status = ?, updated_at = NOW() WHERE id = ?';
        connection.query(query, [status, id], callback);
    }
};

module.exports = Complaints;
