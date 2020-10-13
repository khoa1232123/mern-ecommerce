const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');
const router = express.Router();
const { addToCart } = require('../controller/cart');

router.post('/addtocart', requireSignin, userMiddleware, addToCart);

module.exports = router;
