const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const TechnicianController = require('../controllers/TechniciansController');
router.get('/', (req, res) => {
    res.send('Users route');
});

router.post('/', UserController.createUser);
router.get('/getusersbyadmin', UserController.getUsersByAdmin);
router.get('/gettechniciansbyadmin', UserController.getTechniciansByAdmin);
router.get('/', UserController.getUsers);
router.put('/technician/:id', TechnicianController.updateStatus);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/login', UserController.login);
router.post('/role', UserController.role);
router.get('/checkrole/:id', UserController.checkRole);



module.exports = router;
