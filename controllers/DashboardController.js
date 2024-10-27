const Dashboard = require('../models/Dashboard');

class DashboardController {
    static getDashboard(req, res) {
        Dashboard.get((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    }
}

module.exports = DashboardController;
