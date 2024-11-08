const connection = require('../database');

const Dashboard = {
    get: (callback) => {
        const query = `SELECT
    u.admin_count,
    u.user_count,
    u.technician_count,
    t.banned_count,
    t.active_count,
    j.job_sum,
    j.pending_count,
    j.completed_count,
    j.canceled_count,
    j.in_progress_count,
    j.urgent_count,
    j.normal_count,
    j.nothurry_count
FROM
(SELECT
  COUNT(IF(role = 'A', id, NULL)) AS admin_count,
  COUNT(IF(role = 'U', id, NULL)) AS user_count,
  COUNT(IF(role = 'T', id, NULL)) AS technician_count
 FROM users) AS u
 CROSS JOIN
 (SELECT
   SUM(CASE WHEN status = 'banned' THEN 1 ELSE 0 END) AS banned_count,
   SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active_count
  FROM technicians) AS t
 CROSS JOIN
 (SELECT
   COUNT(id) AS job_sum,
   SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_count,
   SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_count,
   SUM(CASE WHEN status = 'canceled' THEN 1 ELSE 0 END) AS canceled_count,
   SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) AS in_progress_count,
   SUM(CASE WHEN urgency = 'ด่วน' THEN 1 ELSE 0 END) AS urgent_count,
   SUM(CASE WHEN urgency = 'ปกติ' THEN 1 ELSE 0 END) AS normal_count,
   SUM(CASE WHEN urgency = 'ไม่รีบ' THEN 1 ELSE 0 END) AS nothurry_count
  FROM jobs) AS j;`;
        connection.query(query, callback);
    },

};

module.exports = Dashboard;
