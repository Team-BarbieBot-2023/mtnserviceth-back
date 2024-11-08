const Technician = require('../models/Technicians');
const multer = require('multer');

class TechnicianController {
    static createTechnician(req, res) {
        if (!req.file) {
            return res.status(400).json({ error: "File not uploaded" });
        }
        Technician.create({ ...req.body, documents: req.file.filename, }, (err, results) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId });
        });
    }

    static getHistoryByTechnicians(req, res) {
        Technician.getHistoryByTechnicians((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    }

    static getTechnicians(req, res) {
        Technician.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    }

    static getTechniciansByID(req, res) {
        const { id } = req.params;
        Technician.getByUserId(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results[0]);
        });
    }

    static updateStatus(req, res) {
        const { id } = req.params;
        const status = req.body.status;
        console.log(status)
        Technician.updateStatus(id, status, (err) => {
            console.log(err);
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Technician updated successfully' });
        });
    }

    static updateTechnician(req, res) {
        const { id } = req.params;
        Technician.update(id, req.body, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Technician updated successfully' });
        });
    }

    static deleteTechnician(req, res) {
        const { id } = req.params;
        Technician.delete(id, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(204).send();
        });
    }
}

module.exports = TechnicianController;
