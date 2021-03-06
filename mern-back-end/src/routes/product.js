const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();
const {
  createProduct,
  getProductsByCat,
  getProductDetailsById,
} = require('../controller/product');

const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  '/create',
  requireSignin,
  adminMiddleware,
  upload.array('productPicture'),
  createProduct
);

router.get('/getproductsbycat/:slug', getProductsByCat);
// router.get('/getproductsgetProductBySlug', getCategories);
router.get('/:productId', getProductDetailsById);

module.exports = router;
