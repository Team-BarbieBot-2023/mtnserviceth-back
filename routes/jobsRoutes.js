const express = require('express');
const multer = require('multer');
const router = express.Router();
const JobsController = require('../controllers/JobsController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'img/');
    },
    filename: function (req, file, cb) {
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, `${originalName}`);
    }
});

const upload = multer({ storage });

router.get('/user', (req, res) => {
    res.send('Jobs route');
});

router.post('/', upload.array('documents', 10), JobsController.createJobs);
router.get('/', JobsController.getJobs);
router.get('/:id', JobsController.getJobsByID);
router.put('/:id', JobsController.updateJobs);
router.put('/updatestatusjobscompleted/:id', JobsController.updateStatusJobsCompleted);
router.post('/updatestatusjobsinprogress/:id', JobsController.updateStatusJobsInprogress);
router.get('/schedule/:id', JobsController.getJobsByTechnicianID);
router.delete('/:id', JobsController.deleteJobs);
router.get('/jobsbyadmin', JobsController.getJobsByAdmin);

module.exports = router;
