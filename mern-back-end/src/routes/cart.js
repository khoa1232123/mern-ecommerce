const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');
const router = express.Router();
const { addToCart, getCartItems } = require('../controller/cart');

router.post('/addtocart', requireSignin, userMiddleware, addToCart);

router.post('/user/getCartItems', requireSignin, userMiddleware, getCartItems);

module.exports = router;
