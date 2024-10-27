const express = require('express');
const router = express.Router();
const LineController = require('../controllers/LineController');

router.get('/', (req, res) => {
    res.send('Line route');
});

router.get('/', LineController.getLines);
router.put('/:id', LineController.updateLine);

module.exports = router;