const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

// Protect All Routes below it
router.use(authController.protect);

//
router
  .route('/')
  // Get All review
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user', 'admin'),
    reviewController.setTourUserIds,
    // Create Review
    reviewController.createReview
  );
router
  .route('/:id')
  // Get Review by ID
  .get(reviewController.getReview)
  // update the Review
  .patch(reviewController.updateReview)
  // Permanently delete the review from the database
  .delete(reviewController.deleteReview);

module.exports = router;
