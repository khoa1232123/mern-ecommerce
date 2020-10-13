const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();
const { createCategory, getCategories } = require('../controller/category');

router.post('/create', requireSignin, adminMiddleware, createCategory);
router.get('/getcategories', getCategories);

module.exports = router;
