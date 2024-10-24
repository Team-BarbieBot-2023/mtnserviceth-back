const Review = require('../models/Reviews');

class ReviewController {
    static createReview(req, res) {
        Review.create(req.body, (err, results) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId });
        });
    }

    static getReviews(req, res) {
        Review.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    }

    static updateReview(req, res) {
        const { id } = req.params;
        Review.update(id, req.body, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Review updated successfully' });
        });
    }

    static deleteReview(req, res) {
        const { id } = req.params;
        Review.delete(id, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(204).send();
        });
    }

    static getReviewByUserID(req, res) {
        const { id } = req.params;
        Review.getReviewByUserID(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(200).json(results);
        });
    }
}

module.exports = ReviewController;
