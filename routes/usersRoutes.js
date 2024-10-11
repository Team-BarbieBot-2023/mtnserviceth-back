const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', (req, res) => {
    res.send('Users route');
});

router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);


router.post('/login', UserController.login);
router.post('/role', UserController.role);
router.get('/checkrole/:id', UserController.checkRole);


module.exports = router;
