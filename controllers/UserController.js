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
    static getUsersByAdmin(req, res) {
        User.getUserByAdmin((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    }
    static getTechniciansByAdmin(req, res) {
        User.getTechniciansByAdmin((err, results) => {
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

    static login(req, res) {
        const data = req.body;

        User.getByEmail(data.email, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (user.length > 0) {
                return res.status(200).json({ message: 'User already exists', userId: user.id });
            }

            User.create(data, (err, results) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                res.status(201).json({ id: results.insertId });
            });
        });
    }

    static checkRole(req, res) {
        const { id } = req.params;
        User.getBy_id(id, (err, user) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json(user);
        });
    }

    static role(req, res) {
        const data = req.body;
        User.updateRole(data.session.id, data, (err, user) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json(user);
        });
    }
}

module.exports = UserController;
