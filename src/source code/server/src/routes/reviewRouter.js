const express = require('express');
const router = express.Router();
const { createReview, getAllReviews, getReviewById, updateReviewById, deleteReviewById } = require('../controllers/reviewController');

// Route to create a new review
router.post('/', createReview);

// Route to get all reviews
router.get('/', getAllReviews);

// Route to get a specific review by ID
router.get('/:id', getReviewById);

// Route to update a specific review by ID
router.patch('/:id', updateReviewById);

// Route to delete a specific review by ID
router.delete('/:id', deleteReviewById);

module.exports = router;
