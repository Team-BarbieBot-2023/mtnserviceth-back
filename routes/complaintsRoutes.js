const express = require('express');
const router = express.Router();
const ComplaintsController = require('../controllers/ComplaintsController');


router.get('/getjobbyid/:id', ComplaintsController.getJobById);
router.get('/getmycomplaints/:id',ComplaintsController.getMyComplaints);
router.get('/getmycomplaints',ComplaintsController.getComplaintsByStatus);
router.delete('/:id', ComplaintsController.deleteComplaints);
router.post('/', ComplaintsController.createComplaint);


module.exports = router;
