const connection = require('../database');

const Dashboard = {
    get: (callback) => {
        const query = `SELECT
            COUNT(IF(a.role = 'A', a.id, NULL)) AS admin_count,
            COUNT(IF(a.role = 'U', a.id, NULL)) AS user_count,
            COUNT(IF(a.role = 'T', a.id, NULL)) AS technician_count,
            
            SUM(CASE WHEN b.STATUS = 'banned' THEN 1 ELSE 0 END) AS banned_count,
            SUM(CASE WHEN b.STATUS = 'active' THEN 1 ELSE 0 END) AS active_count,
            
            COUNT(c.id) AS job_sum,
            
            SUM(CASE WHEN c.status = 'pending' THEN 1 ELSE 0 END) AS pending_count,
            SUM(CASE WHEN c.status = 'completed' THEN 1 ELSE 0 END) AS completed_count,
            SUM(CASE WHEN c.status = 'canceled' THEN 1 ELSE 0 END) AS canceled_count,
            SUM(CASE WHEN c.status = 'in_progress' THEN 1 ELSE 0 END) AS in_progress_count,

            SUM(CASE WHEN c.urgency = 'ด่วน' THEN 1 ELSE 0 END) AS urgent_count,
            SUM(CASE WHEN c.urgency = 'ปกติ' THEN 1 ELSE 0 END) AS normal_count,
            SUM(CASE WHEN c.urgency = 'ไม่รีบ' THEN 1 ELSE 0 END) AS nothurry_count
        FROM
            users AS a
            LEFT JOIN technicians AS b ON a.id = b.user_id
            LEFT JOIN jobs AS c ON a.id = c.user_id;`;
        connection.query(query, callback);
    },

};

module.exports = Dashboard;
