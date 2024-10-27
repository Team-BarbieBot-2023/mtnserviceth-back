const Line = require('../models/Line');

class LineController {
    static getLines(req, res) {
        Line.getLineByUserID((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    }

    static updateLine(req, res) {
        const { id } = req.params;
        Line.update(id, req.body, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Line updated successfully' });
        });
    }
}

module.exports = LineController;
