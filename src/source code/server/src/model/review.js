//review.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    place_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TouristSpot', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
