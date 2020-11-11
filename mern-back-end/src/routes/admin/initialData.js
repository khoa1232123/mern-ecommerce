const express = require('express');
const { requireSignin, adminMiddleware } = require('../../common-middleware');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();

router.post('/', requireSignin, adminMiddleware, initialData);

module.exports = router;
