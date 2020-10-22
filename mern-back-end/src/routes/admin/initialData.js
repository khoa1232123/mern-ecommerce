const express = require('express');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();

router.post('/', initialData);

module.exports = router;
