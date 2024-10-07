// controllers/UserController.js
const User = require('../models/User');

class UserController {
    static createUser(req, res) {
        User.create(req.body, (err, results) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId });
        });
    }

    static getUsers(req, res) {
        User.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    }

    static updateUser(req, res) {
        const { id } = req.params;
        User.update(id, req.body, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'User updated successfully' });
        });
    }

    static deleteUser(req, res) {
        const { id } = req.params;
        User.delete(id, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(204).send();
        });
    }
}

module.exports = UserController;
