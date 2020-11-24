const { request } = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');
const { addOrder, getOrders } = require('../controller/order');
const router = require('express').Router();

router.post('/addorder', requireSignin, userMiddleware, addOrder);
router.get('/getorders', requireSignin, userMiddleware, getOrders);

module.exports = router;
