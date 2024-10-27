const express = require('express');
const router = express.Router();
const LineController = require('../controllers/LineController');

router.get('/', (req, res) => {
    res.send('Line route');
});

router.get('/:id', LineController.getLineByUserID);

router.post('/webhook', LineController.webhook);

module.exports = router;