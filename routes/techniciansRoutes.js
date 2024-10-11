const express = require('express');
const router = express.Router();
const TechnicianController = require('../controllers/TechniciansController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// กำหนดให้ใช้ multer เป็น middleware สำหรับการอัปโหลด
router.post('/', upload.single('documents'), TechnicianController.createTechnician); // ใช้ single สำหรับไฟล์เดียว
router.get('/', TechnicianController.getTechnicians);
router.put('/:id', TechnicianController.updateTechnician);
router.delete('/:id', TechnicianController.deleteTechnician);

module.exports = router;
