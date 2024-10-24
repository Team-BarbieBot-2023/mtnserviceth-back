const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewsController');

router.get('/', (req, res) => {
    res.send('Reviews route');
});

router.post('/', ReviewController.createReview);
router.get('/', ReviewController.getReviews);
router.put('/:id', ReviewController.updateReview);
router.delete('/:id', ReviewController.deleteReview);


router.get('/:id', ReviewController.getReviewByUserID);




module.exports = router;
