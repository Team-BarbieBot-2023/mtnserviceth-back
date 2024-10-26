const express = require('express');
const router = express.Router();
const ComplaintsController = require('../controllers/ComplaintsController');


router.get('/getjobbyid/:id', ComplaintsController.getJobById);
router.get('/getmycomplaints/:id',ComplaintsController.getMyComplaints);
router.get('/getcomplaintsbyadmin',ComplaintsController.getComplaintsByAdmin);
router.delete('/:id', ComplaintsController.deleteComplaints);
router.post('/', ComplaintsController.createComplaint);
router.post('/updatecase', ComplaintsController.statusByCase);


module.exports = router;
