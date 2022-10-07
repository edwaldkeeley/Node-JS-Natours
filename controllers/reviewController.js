const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      message: 'Sucessfully gotten all review',
      reviews
    }
  });
});
exports.createReview = catchAsync(async (req, res, next) => {
  const createReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    results: createReview.length,
    data: {
      message: 'Sucessfully Created a Review!',
      review: createReview
    }
  });
});
