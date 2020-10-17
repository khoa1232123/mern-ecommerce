const express = require('express');
const { requireSignin } = require('../../common-middleware');
const router = express.Router();
const { signup, signin, signout } = require('../../controller/admin/auth');
const {
  validateSigninRequest,
  isRequestValidated,
  validateSignupRequest,
} = require('../../validators/auth');

router.post('/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signout', requireSignin, signout);

module.exports = router;
