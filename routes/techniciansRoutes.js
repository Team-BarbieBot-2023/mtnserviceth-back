const express = require('express');
const router = express.Router();
const TechnicianController = require('../controllers/TechniciansController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, `${originalName}`);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('documents'), TechnicianController.createTechnician);
router.get('/history', TechnicianController.getHistoryByTechnicians);
router.get('/:id', TechnicianController.getTechniciansByID);
router.put('/:id', upload.single('documents'), TechnicianController.updateTechnician);
router.delete('/:id', TechnicianController.deleteTechnician);

module.exports = router;
