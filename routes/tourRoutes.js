const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
// const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

// router.param('id', tourController.checkID);

// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user', 'admin', 'owner'),
//     reviewController.createReview
//   );

router.use('/:tourId/reviews', reviewRouter);

router.route('/').get(tourController.getAllTours);
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(
  authController.protect,
  // Restricted access Because Normal User Have Free plan access
  authController.restrictTo('lead-guide', 'guide'),
  tourController.getMonthlyPlan
);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

router
  .route('/createTour')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    // Restricted access so Normal Users Cant Randomly Create tours
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    // Restricted access so Normal Users Cant Randomly update
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    // Restricted access so Normal Users Cant Randomly delete
    authController.restrictTo('admin', 'lead-guide', 'owner'),
    tourController.deleteTour
  );

// THIS IS A comment for commit, please feel free to delete it

// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user', 'admin', 'owner'),
//     reviewController.createReview
//   );

module.exports = router;
