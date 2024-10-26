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
    getMyComplantsByAdmin: (callback) => {
        const query = `SELECT c.user_id ,
        c.complaint_title,
        c.complaint_description,
        c.status,
        IFNULL(c.resolution,'') AS resolution,
        c.resolved_at,
        c.complaint_date,
        c.complaint_result,
        c.complaint_id,
        DATE_FORMAT(c.updated_at, '%Y-%m-%d %H:%i:%s') AS updated_at ,
        c.created_at,
        j.job_title,j.job_description,j.status AS job_status,
				j.customer_details,
                j.id AS job_id,
				u.name AS userName,
				u.email AS userEmail,
				ut.name AS techName,
				ut.email AS techEmail,
				j.technician_id
				FROM complaints AS c
        LEFT JOIN jobs AS j ON (c.job_id = j.id) 
				LEFT JOIN users AS u ON (u.id = j.user_id)
				LEFT JOIN technicians AS te ON (te.id = j.technician_id)
				LEFT JOIN users AS ut ON (ut.id = te.user_id)
				ORDER BY created_at DESC`;
        connection.query(query, callback);
    },  
    updateComplaint: (data,callback)=>{
        const action = data.complaint_result;
        switch (action) {
        case 'replace':
            connection.query(`UPDATE technicians SET
                complaint_count = complaint_count + 1
                WHERE id=${data.technician_id};
                UPDATE complaints SET
                resolution = '${data.resolution}',
                resolved_at = NOW(),
                status = 'completed',
                complaint_result =  '${data.complaint_result}'
                WHERE 
                complaint_id = ${data.complaint_id};
                UPDATE jobs SET
                status='pending',
                technician_id=null
                WHERE
                id=${data.job_id};` , callback);
            break;
        case 'baned':
            connection.query(`UPDATE technicians SET
                complaint_count = complaint_count + 1,
                status='banned'
                WHERE id=${data.technician_id};
                UPDATE complaints SET
                resolution = '${data.resolution}',
                resolved_at = NOW(),
                status = 'completed',
                complaint_result =  '${data.complaint_result}'
                WHERE 
                complaint_id = ${data.complaint_id};
                UPDATE jobs SET
                status='pending'
                technician_id=null
                WHERE
                id=${data.job_id};` , callback);
            break;
        case 'warn':
            connection.query(`UPDATE technicians SET
                complaint_count = complaint_count + 1
                WHERE id=${data.technician_id};
                UPDATE complaints SET
                resolution = '${data.resolution}',
                status = "completed",
                resolved_at = NOW(),
                complaint_result = '${data.complaint_result}'
                WHERE 
                complaint_id = ${data.complaint_id};` , callback);
            break;
        case 'no_action':
            connection.query(`
                UPDATE complaints SET
                resolution = '${data.resolution}',
                resolved_at = NOW(),
                complaint_result =  '${data.complaint_result}'
                WHERE 
                complaint_id = ${data.complaint_id};` , callback);
            break;
        case 'refund':
            connection.query(`UPDATE technicians SET
                complaint_count = complaint_count + 1
                WHERE id=${data.technician_id};
                UPDATE complaints SET
                resolution = '${data.resolution}',
                status = 'completed',
                resolved_at = NOW(),
                complaint_result = '${data.complaint_result}'
                WHERE 
                complaint_id = ${data.complaint_id};` , callback);
            break;
        default:
            connection.query(`
                UPDATE complaints SET
                resolution = '${data.resolution}',
                resolved_at = NOW(),
                complaint_result =  '${data.complaint_result}'
                WHERE 
                complaint_id = ${data.complaint_id};` , callback);
        }
    },  
    getMyComplants: (id, callback) => {
        const query = `SELECT c.user_id ,
        c.complaint_title,
        c.complaint_description,
        c.status,
        IFNULL(c.resolution,'รอดำเนินการ') AS resolution,
        c.resolved_at,
        c.complaint_date,
        c.complaint_result,
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
