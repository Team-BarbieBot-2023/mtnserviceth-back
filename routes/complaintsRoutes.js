const express = require('express');
const multer = require('multer');
const router = express.Router();
const JobsController = require('../controllers/JobsController');
const ComplaintsController = require('../controllers/ComplaintsController');


router.get('/getjobbyid/:id', ComplaintsController.getJobById);
router.delete('/:id', JobsController.deleteJobs);



module.exports = router;
