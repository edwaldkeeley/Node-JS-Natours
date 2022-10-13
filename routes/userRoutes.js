const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect All Routes below this
router.use(authController.protect);

// Updates Password
router.patch('/updateMyPassword', authController.updatePassword);

// Gets the current user profile
router.get('/me', userController.getMe, userController.getUser);
// Updates the current user
router.patch('/updateMe', userController.updateMe);
// Disable the Current user
router.delete('/deleteMe', userController.deleteMe);

// Restrict to admins
router.use(authController.restrictTo('admin'));
// Administrator Only
//  |
//  V
router
  .route('/')
  // Restricted access because normal users cant just get the whole users from the database
  .get(userController.getAllUsers)
  // Create User Will Never be Defined So Ignore
  .post(userController.createUser);

router
  .route('/:id')
  // Restricted access because Normal User Cant just see the user by id
  .get(userController.getUser)
  // Update the user
  .patch(userController.updateUser)
  // Permanently wipe the user from the database
  .delete(userController.deleteUser);

module.exports = router;
